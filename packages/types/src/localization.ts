export interface Localization {
	namespace?: string;
	version?: string;
	key?: string;
	"de-DE"?: string;
	"en-US"?: string;
	"es-ES"?: string;
	"fr-FR"?: string;
	"id-ID"?: string;
	"it-IT"?: string;
	"ja-JP"?: string;
	"ko-KR"?: string;
	"pl-PL"?: string;
	"pt-BR"?: string;
	"ru-RU"?: string;
	"zh-CN"?: string;
	"zh-TW"?: string;
}

export interface LocalizationDocument extends Localization {
	_id: string;
}
