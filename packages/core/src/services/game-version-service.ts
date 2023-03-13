import { autoInjectable, singleton } from "tsyringe";
import { GameVersionData } from "#internal/data/game-version-data";
import { GameVersionStatus } from "#internal/types/game-version";

@singleton()
@autoInjectable()
export class GameVersionService {
	constructor(private readonly gameVersionData: GameVersionData) {}

	async getGameVersionStatus(): Promise<GameVersionStatus> {
		const localVersion = await this.gameVersionData.findLatestVersion();
		const remoteVersion = await this.gameVersionData.fetchLatestVersion();
	
		return {
			upToDate: localVersion === remoteVersion,
			latestVersion: remoteVersion,
		};
	}
}
