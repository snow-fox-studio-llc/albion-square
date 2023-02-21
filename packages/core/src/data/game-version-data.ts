import { model, Schema } from "mongoose";
import axios from "axios";
import { GameVersion, GameVersionDocument } from "#types";

const gameVersionSchema = new Schema<GameVersionDocument>(
	{
		version: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const GameVersionModel = model<GameVersionDocument>(
	"GameVersion",
	gameVersionSchema
);

export const createGameVersion = async (
	version: GameVersion["version"]
): Promise<void> => {
	await GameVersionModel.create({ version });
};

export const findLatestVersion = async (): Promise<string | null> => {
	const gameVersionDocument = await GameVersionModel.findOne()
		.sort({ created_at: -1 })
		.lean()
		.exec();
	return gameVersionDocument ? gameVersionDocument.version : null;
};

export const fetchLatestVersion = async (): Promise<string> => {
	return (
		await axios.get(
			"https://api.github.com/repos/broderickhyman/ao-bin-dumps/commits/master",
			{ responseType: "json" }
		)
	).data.sha;
};
