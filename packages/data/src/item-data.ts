import { model, Schema } from "mongoose";
import { Item, ItemDocument } from "@as/types";
import { ResultPage } from "@as/types";

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
	enchantment: {
		type: Number,
		required: true,
	},
	quality: {
		type: Number,
		required: true,
	},
	assetUrl: {
		type: String,
	},
	version: {
		type: String,
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
	en: {
		type: String,
		required: true,
	},
	de: {
		type: String,
		required: true,
	},
	fr: {
		type: String,
		required: true,
	},
	ru: {
		type: String,
		required: true,
	},
	pl: {
		type: String,
		required: true,
	},
	es: {
		type: String,
		required: true,
	},
	pt: {
		type: String,
		required: true,
	},
	zh: {
		type: String,
		required: true,
	},
	ko: {
		type: String,
		required: true,
	},
});

export const ItemModel = model<ItemDocument>("Item", itemSchema);

export const upsertItem = async (item: Item): Promise<void> => {
	const filter = {
		uniqueName: item.uniqueName,
		tier: item.tier,
		enchantment: item.enchantment,
		quality: item.quality,
	};

	await ItemModel.findOneAndUpdate(filter, item, { upsert: true }).exec();
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
