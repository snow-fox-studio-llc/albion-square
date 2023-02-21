export interface GameVersion {
	version: string;
}

export interface GameVersionDocument extends GameVersion {
	_id: string;
	created_at: Date;
}

export interface GameVersionStatus {
	upToDate: boolean;
	latestVersion: string;
}
