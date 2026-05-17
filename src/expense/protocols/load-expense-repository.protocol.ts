import { Expense } from "../entities/expense.entity";

export type Data = {
	userId: string;
	page: number;
	limit: number;
};

export abstract class LoadExpenseRepository {
	abstract load(data: Data): Promise<Expense[]>;
}
