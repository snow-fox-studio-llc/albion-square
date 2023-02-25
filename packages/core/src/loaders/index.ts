import mongoose from "mongoose";

export const initCore = async () => {
	await mongoose.connect(
		process.env.MONGODB_URL || "mongodb://localhost:27017/albion_square"
	);
};

export const shutdownCore = async () => {
	await mongoose.disconnect();
};
