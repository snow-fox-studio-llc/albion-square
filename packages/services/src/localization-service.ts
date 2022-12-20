import { fetchLocalization, upsertLocalizationList } from "@as/data";
import { Localization } from "@as/types";

const LANG_CODE_DICTIONARY: any = Object.freeze({
	"DE-DE": "de-DE",
	"EN-US": "en-US",
	"ES-ES": "es-ES",
	"FR-FR": "fr-FR",
	"ID-ID": "id-ID",
	"IT-IT": "it-IT",
	"JA-JP": "ja-JP",
	"KO-KR": "ko-KR",
	"PL-PL": "pl-PL",
	"PT-BR": "pt-BR",
	"RU-RU": "ru-RU",
	"ZH-CN": "zh-CN",
	"ZH-TW": "zh-TW",
});

export const updateLocalization = async (
	version: string,
	onSuccess: (message: string) => void,
	onError: (message: string) => void
) => {
	const rawLocalizationJson = await fetchLocalization(version);

	const localizationList: Localization[] = [];

	for (const rawLocalization of rawLocalizationJson.tmx.body.tu) {
		if (!rawLocalization["@tuid"] || !rawLocalization.tuv) {
			onError(JSON.stringify(rawLocalization));
			continue;
		}

		const localization: any = {
			namespace: "albionOnline",
			version: version,
			key: rawLocalization["@tuid"],
			...Object.fromEntries(
				Array.isArray(rawLocalization.tuv)
					? new Map(
							rawLocalization.tuv.map((obj: any) => [
								LANG_CODE_DICTIONARY[obj["@xml:lang"]],
								obj.seg,
							])
					  )
					: [
							[
								LANG_CODE_DICTIONARY[rawLocalization.tuv["@xml:lang"]],
								rawLocalization.tuv.seg,
							],
					  ]
			),
		};

		if (!localization["en-US"]) {
			onError(JSON.stringify(rawLocalization));
			continue;
		}

		localizationList.push(localization);

		onSuccess(JSON.stringify(localization));
	}

	onSuccess("Updating localization");

	await upsertLocalizationList(localizationList);

	onSuccess("Done");
};

export * from "@as/data/localization-data";
