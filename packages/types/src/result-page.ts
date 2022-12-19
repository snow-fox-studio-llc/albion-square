export interface ResultPage<T> {
	hits: T[];
	totalHits: number;
	totalPages: number;
}
