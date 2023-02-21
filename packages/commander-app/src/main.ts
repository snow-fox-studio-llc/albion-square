import winston, { transports, format } from "winston";
import { initServices, closeServices } from "@as/core";
import * as app from "#internal/app";

const initCommanderApp = async () => {
	await initServices();

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
	await closeServices();
};

const main = async () => {
	await initCommanderApp();
	await app.run();
	await closeCommanderApp();
};

main();
