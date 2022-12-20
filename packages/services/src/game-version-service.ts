import { fetchLatestVersion, findLatestVersion } from "@as/data";
import { GameVersionStatus } from "@as/types";

export const getGameVersionStatus = async (): Promise<GameVersionStatus> => {
	const localVersion = await findLatestVersion();
	const remoteVersion = await fetchLatestVersion();
	
	return {
		upToDate: localVersion === remoteVersion,
		latestVersion: remoteVersion,
	};
};

export * from "@as/data/game-version-data";
