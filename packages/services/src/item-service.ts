import { fetchAdpItems, upsertItems, fetchRemoteAdpVersion } from "@as/data";
import { Item } from "@as/types";

const arrayOrObjHelperUtil = async (
	i: Array<any> | Object,
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
	info: (message: string) => void
): Promise<void> => {
	const version = await fetchRemoteAdpVersion();

	const json = await fetchAdpItems();

	const jsonKeys = Object.keys(json.items);

	const items: Item[] = [];

	for (let i = 3; i < jsonKeys.length; ++i) {
		let jsonValue = json.items[jsonKeys[i]];

		await arrayOrObjHelperUtil(jsonValue, async (adpItem: any) => {
			const uniqueName = adpItem["@uniquename"];
			const shopCategory = adpItem["@shopcategory"];
			const shopSubCategory = adpItem["@shopsubcategory1"];
			const tier = Number(adpItem["@tier"]);
			const maxQuality = Number(adpItem["@maxqualitylevel"] || "1");

			const localization = "TODO";

			const enchantments = [];

			if ("enchantments" in adpItem) {
				enchantments.push(0);
				await arrayOrObjHelperUtil(
					adpItem.enchantments.enchantment,
					async (enchantment) => {
						enchantments.push(Number(enchantment["@enchantmentlevel"]));
					}
				);
			} else if ("@enchantmentlevel" in adpItem) {
				enchantments.push(Number(adpItem["@enchantmentlevel"]));
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

			info(JSON.stringify(item).substring(0, 60) + "...");
		});
	}

	// await upsertItems(items);
};

export * from "@as/data/item-data";
