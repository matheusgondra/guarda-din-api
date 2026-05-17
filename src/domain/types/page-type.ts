export type PageType<T> = {
	page: number;
	pageSize: number;
	total: number;
	data: T[];
};
