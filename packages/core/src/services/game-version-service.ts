import {
	fetchLatestVersion,
	findLatestVersion,
} from "#internal/data/game-version-data";
import { GameVersionStatus } from "#internal/types/game-version";

export const getGameVersionStatus = async (): Promise<GameVersionStatus> => {
	const localVersion = await findLatestVersion();
	const remoteVersion = await fetchLatestVersion();

	return {
		upToDate: localVersion === remoteVersion,
		latestVersion: remoteVersion,
	};
};
