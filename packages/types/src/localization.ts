export interface Localization {
	namespace?: string;
	version?: string;
	key?: string;
	en?: string;
	de?: string;
	fr?: string;
	ru?: string;
	pl?: string;
	es?: string;
	pt?: string;
	it?: string;
	zh?: string;
	ko?: string;
	ja?: string;
}

export interface LocalizationDocument extends Localization {
	_id: string;
}
