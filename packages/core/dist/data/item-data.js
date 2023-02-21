import { model, Schema } from "mongoose";
import axios from "axios";
import { localizationSchema } from "#data";
const itemSchema = new Schema({
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
        type: localizationSchema,
        required: true,
    },
});
export const ItemModel = model("Item", itemSchema);
export const upsertItem = async (item) => {
    const filter = {
        uniqueName: item.uniqueName,
    };
    await ItemModel.replaceOne(filter, item, { upsert: true }).lean().exec();
};
export const upsertItems = async (items) => {
    await ItemModel.bulkWrite(items.map((item) => {
        return {
            replaceOne: {
                filter: {
                    uniqueName: item.uniqueName,
                },
                replacement: item,
                upsert: true,
            },
        };
    }));
};
export const validateItem = async (item) => {
    await ItemModel.validate(item);
};
const convertDistinctItemToItemFilter = (distinctItem) => {
    return Object.fromEntries(Object.entries(distinctItem).map(([key, value]) => {
        switch (key) {
            case "enchantment":
                return ["enchantments", { $all: [value] }];
            case "quality":
                return ["maxQuality", { $gte: value }];
            default:
                return [key, value];
        }
    }));
};
export const findOneItem = async (distinctItem) => {
    const filter = convertDistinctItemToItemFilter(distinctItem);
    return await ItemModel.findOne(filter).lean().exec();
};
export const findItems = async (distinctItem) => {
    const filter = convertDistinctItemToItemFilter(distinctItem);
    return await ItemModel.find(filter).lean().exec();
};
/**
 * @deprecated The method should not be used
 */
export const findItemsAtPage = async (filter, limit, page) => {
    const hits = await ItemModel.find(filter)
        .limit(limit)
        .skip(page * limit)
        .lean()
        .exec();
    const totalHits = await ItemModel.countDocuments(filter).lean().exec();
    const totalPages = totalHits / limit;
    return { hits, totalHits, totalPages };
};
export const findAllItems = async () => {
    return await ItemModel.find({}).lean().exec();
};
export const searchItems = async (query, lang, distinctItem) => {
    const filter = convertDistinctItemToItemFilter(distinctItem);
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
/**
 * @deprecated The method should not be used
 */
export const searchItemsAtPage = async (query, lang, filter, limit, page) => {
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
export const deleteItemGhosts = async (currentVersion) => {
    await ItemModel.deleteMany({ version: { $ne: currentVersion } });
};
export const fetchItems = async (commit) => {
    return (await axios.get(`https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/${commit}/items.json`, { responseType: "json" })).data;
};
//# sourceMappingURL=item-data.js.map