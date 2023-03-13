import { autoInjectable, singleton } from "tsyringe";
import { model, Schema } from "mongoose";
import axios from "axios";
import { Item, ItemDocument, DistinctItem } from "#internal/types/item";
import { ResultPage } from "#internal/types/result-page";
import { LocalizationData } from "#internal/data/localization-data";

@singleton()
@autoInjectable()
export class ItemData {
	private readonly itemSchema;
	private readonly itemModel;

	constructor(localizationData: LocalizationData) {
		this.itemSchema = new Schema<ItemDocument>({
			uniqueName: {
				type: String,
				required: true,
				unique: true,
			},
			shopCategory: {
				type: String,
				required: true,
			},
			shopSubCategory: {
				type: String,
				required: true,
			},
			tier: {
				type: Number,
				required: true,
			},
			enchantments: {
				type: [Number],
				required: true,
			},
			maxQuality: {
				type: Number,
				required: true,
			},
			version: {
				type: String,
				required: true,
			},
			assetUrl: String,
			localizationDocument: {
				type: localizationData.localizationSchema,
				required: true,
			},
		});

		this.itemModel = model<ItemDocument>("Item", this.itemSchema);
	}

	private static convertDistinctItemToItemFilter(distinctItem: DistinctItem) {
		return Object.fromEntries(
			Object.entries(distinctItem).map(([key, value]) => {
				switch (key) {
					case "enchantment":
						return ["enchantments", { $all: [value] }];
					case "quality":
						return ["maxQuality", { $gte: value }];
					default:
						return [key, value];
				}
			})
		);
	}

	async upsertItem(item: Item): Promise<void> {
		const filter = {
			uniqueName: item.uniqueName,
		};

		await this.itemModel
			.replaceOne(filter, item, { upsert: true })
			.lean()
			.exec();
	}

	async upsertItems(items: Item[]): Promise<void> {
		await this.itemModel.bulkWrite(
			items.map((item: Item) => {
				return {
					replaceOne: {
						filter: {
							uniqueName: item.uniqueName,
						},
						replacement: item,
						upsert: true,
					},
				};
			})
		);
	}

	async validateItem(item: Item): Promise<void> {
		await this.itemModel.validate(item);
	}

	async findOneItem(distinctItem: DistinctItem): Promise<ItemDocument | null> {
		const filter = ItemData.convertDistinctItemToItemFilter(distinctItem);
		return await this.itemModel.findOne(filter).lean().exec();
	}

	async findItems(distinctItem: DistinctItem): Promise<ItemDocument[]> {
		const filter = ItemData.convertDistinctItemToItemFilter(distinctItem);
		return await this.itemModel.find(filter).lean().exec();
	}

	/**
	 * @deprecated The method should not be used
	 */
	async findItemsAtPage(
		filter: Item,
		limit: number,
		page: number
	): Promise<ResultPage<ItemDocument>> {
		const hits = await this.itemModel
			.find(filter)
			.limit(limit)
			.skip(page * limit)
			.lean()
			.exec();
		const totalHits = await this.itemModel.countDocuments(filter).lean().exec();
		const totalPages = totalHits / limit;
		return { hits, totalHits, totalPages };
	}

	async findAllItems(): Promise<ItemDocument[]> {
		return await this.itemModel.find({}).lean().exec();
	}

	async searchItems(
		query: string,
		lang: string,
		distinctItem: DistinctItem
	): Promise<ItemDocument[]> {
		const filter = ItemData.convertDistinctItemToItemFilter(distinctItem);

		return this.itemModel
			.aggregate()
			.search({
				index: "default",
				text: {
					path: [lang],
					query: query,
					fuzzy: {},
				},
			})
			.match(filter)
			.exec();
	}

	/**
	 * @deprecated The method should not be used
	 */
	async searchItemsAtPage(
		query: string,
		lang: string,
		filter: Item,
		limit: number,
		page: number
	): Promise<ResultPage<ItemDocument>> {
		const hits = await this.itemModel
			.aggregate()
			.search({
				index: "default",
				text: {
					path: [lang],
					query: query,
					fuzzy: {},
				},
			})
			.match(filter)
			.count("totalHits")
			.skip(page * limit)
			.limit(limit)
			.exec();
		console.log(hits);
		return { hits: [], totalHits: 0, totalPages: 0 };
	}

	async deleteItemGhosts(currentVersion: Item["version"]): Promise<void> {
		await this.itemModel.deleteMany({ version: { $ne: currentVersion } });
	}

	async fetchItems(commit: string): Promise<any> {
		return (
			await axios.get(
				`https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/${commit}/items.json`,
				{ responseType: "json" }
			)
		).data;
	}
}
