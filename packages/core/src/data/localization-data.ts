import { singleton } from "tsyringe";
import { Schema, model } from "mongoose";
import axios from "axios";
import { Item, DistinctItem } from "#internal/types/item";
import {
	Localization,
	LocalizationDocument,
	LocalizationNamespace,
} from "#internal/types/localization";

@singleton()
export class LocalizationData {
	public readonly localizationSchema;
	private readonly localizationModel;

	constructor() {
		this.localizationSchema = new Schema<LocalizationDocument>({
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
		this.localizationSchema.index({ namespace: 1, key: 1 }, { unique: true });
		this.localizationModel = model<LocalizationDocument>(
			"Localization",
			this.localizationSchema
		);
	}

	async upsertLocalization(localization: Localization): Promise<void> {
		const filter = {
			namespace: localization.namespace,
			key: localization.key,
		};

		await this.localizationModel
			.replaceOne(filter, localization, {
				upsert: true,
			})
			.lean()
			.exec();
	}

	async upsertLocalizationList(
		localizationList: Localization[]
	): Promise<void> {
		await this.localizationModel.bulkWrite(
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
	}

	async validateLocalization(localization: Localization): Promise<void> {
		await this.localizationModel.validate(localization);
	}

	async findLocalizationList(
		filter: Pick<Localization, "namespace" | "key">[]
	): Promise<LocalizationDocument[]> {
		return await this.localizationModel.find({ $or: filter }).lean().exec();
	}

	async findLocalizationByItemUniqueName(
		uniqueName: Item["uniqueName"]
	): Promise<LocalizationDocument | null> {
		return await this.localizationModel
			.findOne({
				namespace: LocalizationNamespace.ALBION_ONLINE,
				key: `@ITEMS_${uniqueName}`,
			})
			.lean()
			.exec();
	}

	async findLocalizationListByItemUniqueName(
		uniqueNames: Item["uniqueName"][]
	): Promise<Localization[]> {
		return await this.localizationModel
			.find({
				namespace: LocalizationNamespace.ALBION_ONLINE,
				key: {
					$in: uniqueNames.map((uniqueName) => `@ITEMS_${uniqueName}`),
				},
			})
			.lean()
			.exec();
	}

	async findLocalizationByShopCategoryId(
		id: string
	): Promise<LocalizationDocument | null> {
		return await this.localizationModel
			.findOne({
				key: `@MARKETPLACEGUI_ROLLOUT_SHOPCATEGORY_${id.toUpperCase()}`,
			})
			.lean()
			.exec();
	}

	async findLocalizationByShopSubCategoryId(
		id: string
	): Promise<LocalizationDocument | null> {
		return await this.localizationModel
			.findOne({
				key: `@MARKETPLACEGUI_ROLLOUT_SHOPSUBCATEGORY_${id.toUpperCase()}`,
			})
			.lean()
			.exec();
	}

	async findLocalizationByItemQuality(
		quality: DistinctItem["quality"]
	): Promise<LocalizationDocument | null> {
		return await this.localizationModel
			.findOne({
				key: `@ITEMDETAILS_STATS_QUALITY_${quality}`,
			})
			.lean()
			.exec();
	}

	async findAllMarketplaceRolloutLocalization(): Promise<
		LocalizationDocument[]
	> {
		return await this.localizationModel
			.find({
				key: { $regex: /@MARKETPLACEGUI_ROLLOUT_DEFAULT/gm },
			})
			.lean()
			.exec();
	}

	async deleteLocalizationGhosts(
		currentVersion: Localization["version"]
	): Promise<void> {
		await this.localizationModel.deleteMany({
			version: { $ne: currentVersion },
		});
	}

	async fetchLocalization(commit: string): Promise<any> {
		return (
			await axios.get(
				`https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/${commit}/localization.json`,
				{ responseType: "json" }
			)
		).data;
	}
}
