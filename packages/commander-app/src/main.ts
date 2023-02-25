import winston, { transports, format } from "winston";
import { initCore, shutdownCore } from "@as/core";
import * as app from "#internal/app";

const initCommanderApp = async () => {
	await initCore();

	winston.configure({
		transports: [
			new transports.Console({
				format: format.combine(
					format.colorize(),
					format.label({ label: "commander-app" }),
					format.timestamp(),
					format.printf(
						({ level, message, label, timestamp }) =>
							`${timestamp} [${label}] ${level}: ${message}`
					)
				),
			}),
		],
	});
};

const closeCommanderApp = async () => {
	await shutdownCore();
};

const main = async () => {
	await initCommanderApp();
	await app.run();
	await closeCommanderApp();
};

main();
