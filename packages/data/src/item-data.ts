import { model, Schema } from "mongoose";
import axios from "axios";
import { Item, ItemDocument, ResultPage } from "@as/types";
import { localizationSchema } from "#internal/localization-data";

const itemSchema = new Schema<ItemDocument>({
	uniqueName: {
		type: String,
		required: true,
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
	assetUrl: {
		type: String,
	},
	localizationDocument: {
		type: localizationSchema,
	},
});

export const ItemModel = model<ItemDocument>("Item", itemSchema);

export const upsertItem = async (item: Item): Promise<void> => {
	const filter = {
		uniqueName: item.uniqueName,
	};

	await ItemModel.findOneAndUpdate(filter, item, { upsert: true }).exec();
};

export const upsertItems = async (items: Item[]): Promise<void> => {
	await ItemModel.bulkWrite(
		items.map((item: Item) => {
			return {
				updateOne: {
					filter: {
						uniqueName: item.uniqueName,
					},
					update: item,
					upsert: true,
				},
			};
		})
	);
};

export const findOneItem = async (
	filter: Item
): Promise<ItemDocument | null> => {
	return await ItemModel.findOne(filter).lean().exec();
};

export const findItems = async (filter: Item): Promise<ItemDocument[]> => {
	return await ItemModel.find(filter).lean().exec();
};

export const findItemsAtPage = async (
	filter: Item,
	limit: number,
	page: number
): Promise<ResultPage<ItemDocument>> => {
	const hits = await ItemModel.find(filter)
		.limit(limit)
		.skip(page * limit)
		.lean()
		.exec();
	const totalHits = await ItemModel.countDocuments(filter).lean().exec();
	const totalPages = totalHits / limit;
	return { hits, totalHits, totalPages };
};

export const findAllItems = async (): Promise<ItemDocument[]> => {
	return await ItemModel.find({}).lean().exec();
};

export const searchItems = async (
	query: string,
	lang: string,
	filter: Item
): Promise<ItemDocument[]> => {
	return ItemModel.aggregate()
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
};

export const searchItemsAtPage = async (
	query: string,
	lang: string,
	filter: Item,
	limit: number,
	page: number
): Promise<ResultPage<ItemDocument>> => {
	const hits = await ItemModel.aggregate()
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
};

export const deleteItemGhosts = async (
	currentVersion: Item["version"]
): Promise<void> => {
	await ItemModel.deleteMany({ version: { $ne: currentVersion } });
};

export const fetchAdpItems = async (): Promise<any> => {
	return (
		await axios.get(
			"https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/items.json",
			{ responseType: "json" }
		)
	).data;
};
