export type PageMetaParameters = {
	page: number;
	pageSize: number;
	totalElements: number;
};

export class PageMetaDTO {
	readonly page: number;
	readonly pageSize: number;
	readonly totalElements: number;
	readonly totalPages: number;
	readonly hasNextPage: boolean;
	readonly hasPreviousPage: boolean;

	constructor({ page, pageSize, totalElements }: PageMetaParameters) {
		this.page = page;
		this.pageSize = pageSize;
		this.totalElements = totalElements;
		this.totalPages = Math.ceil(this.totalElements / this.pageSize);
		this.hasNextPage = this.page < this.totalPages;
		this.hasPreviousPage = this.page > 1;
	}
}
