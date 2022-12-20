import mongoose from "mongoose";

export const initData = async () => {
    await mongoose.connect(
		process.env.MONGODB_URL || "mongodb://localhost:27017/albion_square"
	);
}

export const closeData = async () => {
    await mongoose.disconnect();
}

export * from "#internal/item-data";
export * from "#internal/localization-data";
export * from "#internal/adp-version-data";
