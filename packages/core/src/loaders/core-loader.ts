import { initMongoose, shutdownMongoose } from "./mongoose-loader.js";

export const initCore = async () => {
	await initMongoose();
};

export const shutdownCore = async () => {
	await shutdownMongoose();
};
