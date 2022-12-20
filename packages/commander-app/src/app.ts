import { Command } from "commander";
import winston from "winston";
import {
	getAdpVersionStatus,
	populateItemsFromMetadata,
	updateLocalization,
} from "@as/services";

export const run = async () => {
	const program = new Command();

	program.version("1.0");

	program
		.command("get-adp-version-status")
		.description(
			"Compares local and remote https://github.com/broderickhyman/ao-bin-dumps commit sha"
		)
		.action(async () => {
			const adpVersionStatus = await getAdpVersionStatus();
			winston.info(JSON.stringify(adpVersionStatus));
		});

	program
		.command("adp-github-action")
		.description("Runs all ADP metadata scripts")
		.action(async () => {
			const adpVersionStatus = await getAdpVersionStatus();

			winston.info(JSON.stringify(adpVersionStatus));

			if (adpVersionStatus.upToDate) {
				return;
			}

			await updateLocalization(
				adpVersionStatus.latestAdpVersion,
				winston.info,
				winston.error
			);
		});

	await program.parseAsync(process.argv);
};
