export interface Item {
	uniqueName?: string;
	shopCategory?: string;
	shopSubCategory?: string;
	tier?: number;
	enchantment?: number;
	quality?: number;
	assetUrl?: string;
	version?: string;
	enchantments?: number[];
	maxQuality?: number;
	en?: string;
	de?: string;
	fr?: string;
	ru?: string;
	pl?: string;
	es?: string;
	pt?: string;
	zh?: string;
	ko?: string;
}

export interface ItemDocument extends Item {
	_id: string;
}
