import { Command } from "commander";
import winston from "winston";
import {
	getGameVersionStatus,
	updateLocalization,
	updateItems,
} from "@as/services";

export const run = async () => {
	const program = new Command();

	program.version("1.0");

	program
		.command("get-game-version-status")
		.description("Compares local and remote game versions")
		.action(async () => {
			const gameVersionStatus = await getGameVersionStatus();
			winston.info(JSON.stringify(gameVersionStatus));
		});

	program
		.command("game-version-update-gh-action")
		.description(
			"Compares local and remote game versions. Runs all update services if necessary"
		)
		.action(async () => {
			const gameVersionStatus = await getGameVersionStatus();

			winston.info(JSON.stringify(gameVersionStatus));

			if (gameVersionStatus.upToDate) {
				return;
			}

			await updateLocalization(
				gameVersionStatus.latestVersion,
				winston.info,
				winston.error
			);

			await updateItems(
				gameVersionStatus.latestVersion,
				winston.info,
				winston.error
			);
		});

	await program.parseAsync(process.argv);
};
