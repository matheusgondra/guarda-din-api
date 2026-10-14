import { Expense } from "../entities/expense.entity.js";

export abstract class AddExpenseRepository {
	abstract add(expense: Expense): Promise<Expense>;
}
