import { Schema, model } from "mongoose";
import { Localization, LocalizationDocument } from "@as/types";
import { Item } from "@as/types";

export const localizationSchema = new Schema<LocalizationDocument>({
	namespace: {
		type: String,
		required: true,
	},
	version: {
		type: String,
		required: true,
	},
	key: {
		type: String,
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
	it: {
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
	ja: {
		type: String,
		required: true,
	},
});

export const LocalizationModel = model<LocalizationDocument>(
	"Localization",
	localizationSchema
);

export const upsertLocalization = async (
	localization: Localization
): Promise<void> => {
	const filter = {
		namespace: localization.namespace,
		key: localization.key,
	};

	await LocalizationModel.findOneAndUpdate(filter, localization, {
		upsert: true,
	}).exec();
};

export const findLocalizationByItemUniqueName = async (
	uniqueName: Item["uniqueName"]
): Promise<LocalizationDocument | null> => {
	return await LocalizationModel.findOne({
		key: `@ITEMS_${uniqueName}`,
	})
		.lean()
		.exec();
};

export const findLocalizationByShopCategoryId = async (
	id: string
): Promise<LocalizationDocument | null> => {
	return await LocalizationModel.findOne({
		key: `@MARKETPLACEGUI_ROLLOUT_SHOPCATEGORY_${id.toUpperCase()}`,
	})
		.lean()
		.exec();
};

export const findLocalizationByShopSubCategoryId = async (
	id: string
): Promise<LocalizationDocument | null> => {
	return await LocalizationModel.findOne({
		key: `@MARKETPLACEGUI_ROLLOUT_SHOPSUBCATEGORY_${id.toUpperCase()}`,
	})
		.lean()
		.exec();
};

export const findLocalizationByItemQuality = async (
	quality: number
): Promise<LocalizationDocument | null> => {
	return await LocalizationModel.findOne({
		key: `@ITEMDETAILS_STATS_QUALITY_${quality}`,
	})
		.lean()
		.exec();
};

export const findAllMarketplaceRolloutLocalization = async (
	id: string
): Promise<LocalizationDocument[]> => {
	return await LocalizationModel.find({
		key: { $regex: /@MARKETPLACEGUI_ROLLOUT_DEFAULT/gm },
	})
		.lean()
		.exec();
};

export const deleteLocalizationGhosts = async (
	currentVersion: Item["version"]
): Promise<void> => {
	await LocalizationModel.deleteMany({ version: { $ne: currentVersion } });
};
