import mongoose from "mongoose";
import { LoggerUtility } from "#internal/utilities/logger-utility";

export const initMongoose = async () => {
	const logger = new LoggerUtility("mongoose-loader");
	logger.info("Initializing mongoose");

	await mongoose.connect(
		process.env.MONGODB_URL || "mongodb://localhost:27017/albion_square"
	);
};

export const shutdownMongoose = async () => {
	const logger = new LoggerUtility("mongoose-loader");
	logger.info("Disconnecting mongoose");

	await mongoose.disconnect();
};
