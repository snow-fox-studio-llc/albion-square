import { Schema, model } from "mongoose";
import axios from "axios";
import {
	Item,
	DistinctItem,
	Localization,
	LocalizationDocument,
	LocalizationNamespace,
} from "#types";

export const localizationSchema = new Schema<LocalizationDocument>({
	namespace: {
		type: String,
		enum: [
			LocalizationNamespace.ALBION_ONLINE,
			LocalizationNamespace.ALBION_SQUARE,
		],
		required: true,
	},
	key: {
		type: String,
		required: true,
	},
	"de-DE": String,
	"en-US": {
		type: String,
		required: true,
	},
	"es-ES": String,
	"fr-FR": String,
	"id-ID": String,
	"it-IT": String,
	"ja-JP": String,
	"ko-KR": String,
	"pl-PL": String,
	"pt-BR": String,
	"ru-RU": String,
	"zh-CN": String,
	"zh-TW": String,
	version: {
		type: String,
		required: true,
	},
});

localizationSchema.index({ namespace: 1, key: 1 }, { unique: true });

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

	await LocalizationModel.replaceOne(filter, localization, {
		upsert: true,
	})
		.lean()
		.exec();
};

export const upsertLocalizationList = async (
	localizationList: Localization[]
): Promise<void> => {
	await LocalizationModel.bulkWrite(
		localizationList.map((localization: Localization) => {
			return {
				replaceOne: {
					filter: {
						namespace: localization.namespace,
						key: localization.key,
					},
					replacement: localization,
					upsert: true,
				},
			};
		})
	);
};

export const validateLocalization = async (
	localization: Localization
): Promise<void> => {
	await LocalizationModel.validate(localization);
};

export const findLocalizationList = async (
	filter: Pick<Localization, "namespace" | "key">[]
): Promise<LocalizationDocument[]> => {
	return await LocalizationModel.find({ $or: filter }).lean().exec();
};

export const findLocalizationByItemUniqueName = async (
	uniqueName: Item["uniqueName"]
): Promise<LocalizationDocument | null> => {
	return await LocalizationModel.findOne({
		namespace: LocalizationNamespace.ALBION_ONLINE,
		key: `@ITEMS_${uniqueName}`,
	})
		.lean()
		.exec();
};

export const findLocalizationListByItemUniqueName = async (
	uniqueNames: Item["uniqueName"][]
): Promise<Localization[]> => {
	return await LocalizationModel.find({
		namespace: LocalizationNamespace.ALBION_ONLINE,
		key: {
			$in: uniqueNames.map((uniqueName) => `@ITEMS_${uniqueName}`),
		},
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
	quality: DistinctItem["quality"]
): Promise<LocalizationDocument | null> => {
	return await LocalizationModel.findOne({
		key: `@ITEMDETAILS_STATS_QUALITY_${quality}`,
	})
		.lean()
		.exec();
};

export const findAllMarketplaceRolloutLocalization = async (): Promise<
	LocalizationDocument[]
> => {
	return await LocalizationModel.find({
		key: { $regex: /@MARKETPLACEGUI_ROLLOUT_DEFAULT/gm },
	})
		.lean()
		.exec();
};

export const deleteLocalizationGhosts = async (
	currentVersion: Localization["version"]
): Promise<void> => {
	await LocalizationModel.deleteMany({ version: { $ne: currentVersion } });
};

export const fetchLocalization = async (commit: string): Promise<any> => {
	return (
		await axios.get(
			`https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/${commit}/localization.json`,
			{ responseType: "json" }
		)
	).data;
};
