import { LocalizationDocument } from "./localization.js";

export interface Item {
	uniqueName?: string;
	shopCategory?: string;
	shopSubCategory?: string;
	tier?: number;
	enchantments?: number[];
	maxQuality?: number;
	version?: string;
	assetUrl?: string;
	localizationDocument?: LocalizationDocument;
}

export interface ItemDocument extends Item {
	_id: string;
}
