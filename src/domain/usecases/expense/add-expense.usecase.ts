import { Category } from "@/domain/models/category";
import { Money } from "@/domain/models/money";

export type AddExpenseParam = {
	date: Date;
	amount: Money;
	description: string;
	category: Category;
};

export type AddExpenseResult = {
	id: string;
	amount: Money;
	date: Date;
	description: string;
	category: Category;
	createdAt: Date;
	updatedAt: Date;
};

export interface AddExpenseUseCase {
	execute(param: AddExpenseParam): Promise<AddExpenseResult>;
}
