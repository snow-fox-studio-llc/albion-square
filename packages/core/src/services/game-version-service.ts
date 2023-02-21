import { fetchLatestVersion, findLatestVersion } from "#data";
import { GameVersionStatus } from "#types";

export const getGameVersionStatus = async (): Promise<GameVersionStatus> => {
	const localVersion = await findLatestVersion();
	const remoteVersion = await fetchLatestVersion();
	
	return {
		upToDate: localVersion === remoteVersion,
		latestVersion: remoteVersion,
	};
};

export * from "#internal/data/game-version-data";
