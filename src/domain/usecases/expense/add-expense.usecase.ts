import { Category } from "@/domain/models/category";
import { Money } from "@/domain/models/money";

export type AddExpenseParam = {
	date: Date;
	amount: Money;
	description: string;
	category: Category;
	userId: string;
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

export abstract class AddExpenseUseCase {
	abstract execute(param: AddExpenseParam): Promise<AddExpenseResult>;
}
