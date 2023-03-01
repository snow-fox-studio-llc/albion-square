import { initCore, shutdownCore } from "@as/core";
import * as app from "#internal/app";

const main = async () => {
	await initCore();
	await app.run();
	await shutdownCore();
};

main();
