import { LocalizationDocument } from "#internal/types/localization";

export interface Item {
	uniqueName: string;
	shopCategory: string;
	shopSubCategory: string;
	tier: number;
	enchantments: number[];
	maxQuality: number;
	version: string;
	assetUrl: string | null;
	localizationDocument: LocalizationDocument;
}

export interface ItemDocument extends Item {
	_id: string;
}

export interface DistinctItem {
	uniqueName: Item["uniqueName"];
	shopCategory: Item["shopCategory"];
	shopSubCategory: Item["shopSubCategory"];
	tier: Item["tier"];
	enchatment: number;
	quality: number;
}
