import { Injectable } from "@nestjs/common";
import { AddExpenseParam, AddExpenseResult, AddExpenseUseCase } from "@/domain/usecases/expense/add-expense.usecase";
import { Expense } from "../entities/expense.entity";
import { AddExpenseRepository } from "../protocols/add-expense-repository.protocol";

@Injectable()
export class AddExpenseService implements AddExpenseUseCase {
	constructor(private readonly addExpenseRepository: AddExpenseRepository) {}

	async execute(param: AddExpenseParam): Promise<AddExpenseResult> {
		const expense = new Expense(param);
		const expenseCreated = await this.addExpenseRepository.add(expense);

		return {
			id: expenseCreated.getId(),
			date: expenseCreated.getDate(),
			amount: expenseCreated.getAmount(),
			description: expenseCreated.getDescription(),
			category: expenseCreated.getCategory(),
			createdAt: expenseCreated.getCreatedAt(),
			updatedAt: expenseCreated.getUpdatedAt()
		};
	}
}
