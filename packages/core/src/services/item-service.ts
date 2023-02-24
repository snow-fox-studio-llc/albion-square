import {
	fetchItems,
	validateItem,
	upsertItems,
	findLocalizationList,
	deleteItemGhosts,
} from "#data";
import { Item, LocalizationDocument, LocalizationNamespace } from "#types";

const extractRawObjects = async (
	rawJson: any,
	key: string,
	rawObjects: any[] = []
): Promise<any[]> => {
	if (Array.isArray(rawJson)) {
		for (const item of rawJson) {
			await extractRawObjects(item, key, rawObjects);
		}
	} else if (typeof rawJson === "object") {
		if (Object.keys(rawJson).includes(key)) {
			rawObjects.push(rawJson);
		} else {
			for (const item of Object.values(rawJson)) {
				await extractRawObjects(item, key, rawObjects);
			}
		}
	}

	return rawObjects;
};

export const updateItems = async (
	version: string,
	onSuccess: (message: string) => void,
	onError: (message: string) => void
): Promise<void> => {
	const rawItemsJson = await fetchItems(version);

	const rawItems = await extractRawObjects(rawItemsJson, "@uniquename");

	const localizationList = await findLocalizationList(
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

			const rawEnchantments = await extractRawObjects(
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
			await validateItem(item);
		} catch (err) {
			onError(`${uniqueName} invalid`);
			continue;
		}

		items.push(item);

		onSuccess(`${uniqueName} done`);
	}

	onSuccess("Updating items");

	await upsertItems(items);

	await deleteItemGhosts(version);

	onSuccess("Done");
};

export * from "#internal/data/item-data";
