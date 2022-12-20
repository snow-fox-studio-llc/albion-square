import { Schema, model } from "mongoose";
import axios from "axios";
import { Localization, LocalizationDocument } from "@as/types";
import { Item } from "@as/types";

export const localizationSchema = new Schema<LocalizationDocument>({
	namespace: {
		type: String,
		enum: ["albionOnline", "albionSquare"],
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

export const upsertLocalizationList = async (
	localizationList: Localization[]
): Promise<void> => {
	await LocalizationModel.bulkWrite(
		localizationList.map((localization: Localization) => {
			return {
				updateOne: {
					filter: {
						namespace: localization.namespace,
						key: localization.key,
					},
					update: localization,
					upsert: true,
				},
			};
		})
	);
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

export const fetchLocalization = async (commit: string): Promise<any> => {
	return (
		await axios.get(
			`https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/${commit}/localization.json`,
			{ responseType: "json" }
		)
	).data;
};
