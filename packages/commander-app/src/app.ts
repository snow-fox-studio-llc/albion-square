import { container } from "tsyringe";
import { Command } from "commander";
import {
	GameVersionService,
	LocalizationService,
	ItemService,
	LoggerUtility,
} from "@as/core";

export const run = async () => {
	const logger = new LoggerUtility("commander-app");

	const gameVersionService = container.resolve(GameVersionService);
	const localizationService = container.resolve(LocalizationService);
	const itemService = container.resolve(ItemService);

	const program = new Command();

	program.version("1.0");

	program
		.command("get-game-version-status")
		.description("Compares local and remote game versions")
		.action(async () => {
			const gameVersionStatus = await gameVersionService.getGameVersionStatus();
			logger.info(JSON.stringify(gameVersionStatus));
		});

	program
		.command("game-version-update-gh-action")
		.description(
			"Compares local and remote game versions. Runs all update services if necessary"
		)
		.action(async () => {
			const gameVersionStatus = await gameVersionService.getGameVersionStatus();

			logger.info(JSON.stringify(gameVersionStatus));

			if (gameVersionStatus.upToDate) {
				return;
			}

			await localizationService.updateLocalization(gameVersionStatus.latestVersion);
			await itemService.updateItems(gameVersionStatus.latestVersion);
		});

	await program.parseAsync(process.argv);
};
