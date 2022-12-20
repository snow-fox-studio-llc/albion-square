import { fetchItems, upsertItems } from "@as/data";
import { Item } from "@as/types";

const arrayOrObjHelperUtil = async (
	i: any,
	cb: (item: any) => Promise<any>
) => {
	if (Array.isArray(i)) {
		for (const k of i) {
			await cb(k);
		}
	} else {
		await cb(i);
	}
};

export const populateItemsFromMetadata = async (
	version: string,
	onSuccess: (message: string) => void,
	onError: (message: string) => void,
): Promise<void> => {
	const rawItemsJson = await fetchItems();

	const rawItemsJsonKeys = Object.keys(rawItemsJson.items);

	const items: Item[] = [];

	for (let i = 3; i < rawItemsJsonKeys.length; ++i) {
		let rawItemsJsonValue = rawItemsJson.items[rawItemsJsonKeys[i]];

		await arrayOrObjHelperUtil(rawItemsJsonValue, async (rawItem: any) => {
			const uniqueName = rawItem["@uniquename"];
			const shopCategory = rawItem["@shopcategory"];
			const shopSubCategory = rawItem["@shopsubcategory1"];
			const tier = Number(rawItem["@tier"]);
			const maxQuality = Number(rawItem["@maxqualitylevel"] || "1");

			const localization = "TODO";

			const enchantments = [];

			if ("enchantments" in rawItem) {
				enchantments.push(0);
				await arrayOrObjHelperUtil(
					rawItem.enchantments.enchantment,
					async (enchantment) => {
						enchantments.push(Number(enchantment["@enchantmentlevel"]));
					}
				);
			} else if ("@enchantmentlevel" in rawItem) {
				enchantments.push(Number(rawItem["@enchantmentlevel"]));
			} else {
				enchantments.push(0);
			}

			const item = {
				uniqueName,
				shopCategory,
				shopSubCategory,
				tier,
				enchantments,
				maxQuality,
				version,
			};

			items.push(item);

			onSuccess(JSON.stringify(item));
		});
	}

	// await upsertItems(items);
};

export * from "@as/data/item-data";
