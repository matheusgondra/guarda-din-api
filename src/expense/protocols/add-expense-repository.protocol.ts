import { Expense } from "../entities/expense.entity";

export abstract class AddExpenseRepository {
	abstract add(expense: Expense): Promise<Expense>;
}
