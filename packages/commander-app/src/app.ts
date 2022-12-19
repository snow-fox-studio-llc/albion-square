import { Command } from "commander";
import winston from "winston";

import { getAdpVersionStatus } from "@as/services";

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
			winston.info(adpVersionStatus.latestAdpVersion);
		});

	program
		.command("run-adp-scripts")
		.description("Runs all ADP metadata scripts")
		.action(async () => {
			const adpVersionStatus = await getAdpVersionStatus();
			console.log(adpVersionStatus);
		});

	await program.parseAsync(process.argv);
};
