import { fetchLatestVersion, findLatestVersion } from "#data";
export const getGameVersionStatus = async () => {
    const localVersion = await findLatestVersion();
    const remoteVersion = await fetchLatestVersion();
    return {
        upToDate: localVersion === remoteVersion,
        latestVersion: remoteVersion,
    };
};
export * from "#internal/data/game-version-data";
//# sourceMappingURL=game-version-service.js.map