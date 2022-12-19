export interface AdpVersion {
	sha: string;
}

export interface AdpVersionDocument extends AdpVersion {
	_id: string;
	created_at: Date;
}

export interface AdpVersionStatus {
	upToDate: boolean;
	latestAdpVersion: string;
}
