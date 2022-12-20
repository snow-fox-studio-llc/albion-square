import { fetchRemoteAdpVersion, findLocalAdpVersion } from "@as/data";
import { AdpVersionStatus } from "@as/types";

export const getAdpVersionStatus = async (): Promise<AdpVersionStatus> => {
	const localAdpVersion = await findLocalAdpVersion();
	const remoteAdpVersion = await fetchRemoteAdpVersion();
	
	return {
		upToDate: localAdpVersion === remoteAdpVersion,
		latestAdpVersion: remoteAdpVersion,
	};
};

export * from "@as/data/adp-version-data";
