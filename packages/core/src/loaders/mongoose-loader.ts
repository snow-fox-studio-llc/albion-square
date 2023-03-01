import mongoose from "mongoose";
import { LoggerUtility } from "#internal/utilities/logger-utility";

const logger = new LoggerUtility("mongoose-loader");

export const initMongoose = async () => {
	logger.info("Initializing mongoose");

	await mongoose.connect(
		process.env.MONGODB_URL || "mongodb://localhost:27017/albion_square"
	);
};

export const shutdownMongoose = async () => {
	logger.info("Disconnecting mongoose");

	await mongoose.disconnect();
};
