import { singleton } from "tsyringe";
import { model, Schema } from "mongoose";
import axios from "axios";
import { GameVersion, GameVersionDocument } from "#internal/types/game-version";

@singleton()
export class GameVersionData {
	private readonly gameVersionSchema;
	private readonly gameVersionModel;

	constructor() {
		this.gameVersionSchema = new Schema<GameVersionDocument>(
			{
				version: {
					type: String,
					required: true,
				},
			},
			{ timestamps: true }
		);

		this.gameVersionModel = model<GameVersionDocument>(
			"GameVersion",
			this.gameVersionSchema
		);
	}

	async createGameVersion(version: GameVersion["version"]): Promise<void> {
		await this.gameVersionModel.create({ version });
	}

	async findLatestVersion(): Promise<string | null> {
		const gameVersionDocument = await this.gameVersionModel
			.findOne()
			.sort({ created_at: -1 })
			.lean()
			.exec();
		return gameVersionDocument ? gameVersionDocument.version : null;
	}

	async fetchLatestVersion(): Promise<string> {
		return (
			await axios.get(
				"https://api.github.com/repos/broderickhyman/ao-bin-dumps/commits/master",
				{ responseType: "json" }
			)
		).data.sha;
	}
}
