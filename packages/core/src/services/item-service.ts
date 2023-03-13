import { autoInjectable, singleton } from "tsyringe";
import { ItemData } from "#internal/data/item-data";
import { LocalizationData } from "#internal/data/localization-data";
import { Item } from "#internal/types/item";
import { LoggerUtility } from "#internal/utilities/logger-utility";
import {
	LocalizationDocument,
	LocalizationNamespace,
} from "#internal/types/localization";

@singleton()
@autoInjectable()
export class ItemService {
	private readonly logger = new LoggerUtility("item-service");

	constructor(
		private readonly itemData: ItemData,
		private readonly localizationData: LocalizationData
	) {}

	private static async extractRawObjects(
		rawJson: any,
		key: string,
		rawObjects: any[] = []
	): Promise<any[]> {
		if (Array.isArray(rawJson)) {
			for (const item of rawJson) {
				await ItemService.extractRawObjects(item, key, rawObjects);
			}
		} else if (typeof rawJson === "object") {
			if (Object.keys(rawJson).includes(key)) {
				rawObjects.push(rawJson);
			} else {
				for (const item of Object.values(rawJson)) {
					await ItemService.extractRawObjects(item, key, rawObjects);
				}
			}
		}

		return rawObjects;
	}

	async updateItems(version: string): Promise<void> {
		const rawItemsJson = await this.itemData.fetchItems(version);

		const rawItems = await ItemService.extractRawObjects(
			rawItemsJson,
			"@uniquename"
		);

		const localizationList = await this.localizationData.findLocalizationList(
			rawItems.map((rawItem) => {
				return {
					namespace: LocalizationNamespace.ALBION_ONLINE,
					key: `@ITEMS_${rawItem["@uniquename"]}`,
				};
			})
		);

		const localizationMap = new Map(
			localizationList.map((localizationDocument) => [
				localizationDocument.key.substring(7, localizationDocument.key.length),
				localizationDocument,
			])
		);

		const items: Item[] = [];

		for (const rawItem of rawItems) {
			const uniqueName = rawItem["@uniquename"];
			const shopCategory = rawItem["@shopcategory"];
			const shopSubCategory = rawItem["@shopsubcategory1"];
			const tier = Number(rawItem["@tier"]);
			const maxQuality = Number(rawItem["@maxqualitylevel"] || "1");
			const localizationDocument = localizationMap.get(
				uniqueName
			) as LocalizationDocument;

			const enchantments = [];

			if ("enchantments" in rawItem) {
				enchantments.push(0);

				const rawEnchantments = await ItemService.extractRawObjects(
					rawItem.enchantments.enchantment,
					"@enchantmentlevel"
				);

				for (const rawEnchantment of rawEnchantments) {
					enchantments.push(rawEnchantment["@enchantmentlevel"]);
				}
			} else if ("@enchantmentlevel" in rawItem) {
				enchantments.push(Number(rawItem["@enchantmentlevel"]));
			} else {
				enchantments.push(0);
			}

			const assetUrl = null;

			const item: Item = {
				uniqueName,
				shopCategory,
				shopSubCategory,
				tier,
				enchantments,
				maxQuality,
				version,
				assetUrl,
				localizationDocument,
			};

			try {
				await this.itemData.validateItem(item);
			} catch (err) {
				this.logger.error(`${uniqueName} invalid`);
				continue;
			}

			items.push(item);

			this.logger.info(`${uniqueName} done`);
		}

		this.logger.info("Updating items");

		await this.itemData.upsertItems(items);

		await this.itemData.deleteItemGhosts(version);

		this.logger.info("Done");
	}
}
