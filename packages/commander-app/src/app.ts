import { Command } from "commander";
import {
	getGameVersionStatus,
	updateLocalization,
	updateItems,
	LoggerUtility,
} from "@as/core";

const logger = new LoggerUtility("commander-app");

export const run = async () => {
	const program = new Command();

	program.version("1.0");

	program
		.command("get-game-version-status")
		.description("Compares local and remote game versions")
		.action(async () => {
			const gameVersionStatus = await getGameVersionStatus();
			logger.info(JSON.stringify(gameVersionStatus));
		});

	program
		.command("game-version-update-gh-action")
		.description(
			"Compares local and remote game versions. Runs all update services if necessary"
		)
		.action(async () => {
			const gameVersionStatus = await getGameVersionStatus();

			logger.info(JSON.stringify(gameVersionStatus));

			if (gameVersionStatus.upToDate) {
				return;
			}

			await updateLocalization(gameVersionStatus.latestVersion);
			await updateItems(gameVersionStatus.latestVersion);
		});

	await program.parseAsync(process.argv);
};
