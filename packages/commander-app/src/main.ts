import winston, { transports } from "winston";
import { initServices, closeServices } from "@as/services";
import * as app from "#internal/app";

const initCommanderApp = async () => {
	await initServices();

	winston.configure({
		transports: [new transports.Console()],
	});
};

const closeCommanderApp = async () => {
	await closeServices();
}

const main = async () => {
	await initCommanderApp();
	await app.run();
	await closeCommanderApp();
};

main();
