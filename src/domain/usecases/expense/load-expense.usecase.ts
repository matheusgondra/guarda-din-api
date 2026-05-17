import { Money } from "@/domain/models/money";
import { PageType } from "@/domain/types/page-type";

export type LoadExpenseParam = {
	userId: string;
	page: number;
	pageSize: number;
};

type LoadExpenseData = {
	id: string;
	amount: Money;
	date: Date;
	description: string;
	category: string;
	createdAt: Date;
	updatedAt: Date;
};

export type LoadExpenseResult = PageType<LoadExpenseData>;

export abstract class LoadExpenseUseCase {
	abstract execute(param: LoadExpenseParam): Promise<LoadExpenseResult>;
}
