import { autoInjectable, singleton } from "tsyringe";
import { LocalizationData } from "#internal/data/localization-data";
import { Localization } from "#internal/types/localization";
import { LoggerUtility } from "#internal/utilities/logger-utility";

@singleton()
@autoInjectable()
export class LocalizationService {
	private static readonly LANG_CODE_DICTIONARY: any = Object.freeze({
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

	private readonly logger = new LoggerUtility("localization-service");

	constructor(private readonly localizationData: LocalizationData) {}

	async updateLocalization(version: string): Promise<void> {
		const rawLocalizationJson = await this.localizationData.fetchLocalization(
			version
		);

		const localizationList: Localization[] = [];

		for (const rawLocalization of rawLocalizationJson.tmx.body.tu) {
			if (!rawLocalization["@tuid"] || !rawLocalization.tuv) {
				this.logger.error(JSON.stringify(rawLocalization));
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
									LocalizationService.LANG_CODE_DICTIONARY[obj["@xml:lang"]],
									obj.seg,
								])
						  )
						: [
								[
									LocalizationService.LANG_CODE_DICTIONARY[
										rawLocalization.tuv["@xml:lang"]
									],
									rawLocalization.tuv.seg,
								],
						  ]
				),
			} as Localization;

			try {
				await this.localizationData.validateLocalization(localization);
			} catch (err) {
				this.logger.error(`${localization.key} invalid`);
				continue;
			}

			localizationList.push(localization);

			this.logger.info(`${localization.key} done`);
		}

		this.logger.info("Updating localization");

		await this.localizationData.upsertLocalizationList(localizationList);

		await this.localizationData.deleteLocalizationGhosts(version);

		this.logger.info("Done");
	}
}
