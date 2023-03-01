import mongoose from "mongoose";

export const initMongoose = async () => {
    await mongoose.connect(
		process.env.MONGODB_URL || "mongodb://localhost:27017/albion_square"
	);
}

export const shutdownMongoose = async () => {
    await mongoose.disconnect();
}

