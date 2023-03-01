import {
	deleteLocalizationGhosts,
	fetchLocalization,
	upsertLocalizationList,
	validateLocalization,
} from "#internal/data/localization-data";
import { Localization } from "#internal/types/localization";
import { LoggerUtility } from "#internal/utilities/logger-utility";

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

const logger = new LoggerUtility("localization-service");

export const updateLocalization = async (version: string) => {
	const rawLocalizationJson = await fetchLocalization(version);

	const localizationList: Localization[] = [];

	for (const rawLocalization of rawLocalizationJson.tmx.body.tu) {
		if (!rawLocalization["@tuid"] || !rawLocalization.tuv) {
			logger.error(JSON.stringify(rawLocalization));
			continue;
		}

		const localization = {
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
		} as Localization;

		try {
			await validateLocalization(localization);
		} catch (err) {
			logger.error(`${localization.key} invalid`);
			continue;
		}

		localizationList.push(localization);

		logger.info(`${localization.key} done`);
	}

	logger.info("Updating localization");

	await upsertLocalizationList(localizationList);

	await deleteLocalizationGhosts(version);

	logger.info("Done");
};
