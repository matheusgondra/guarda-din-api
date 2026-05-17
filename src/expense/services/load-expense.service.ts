import { Injectable } from "@nestjs/common";
import {
	LoadExpenseParam,
	LoadExpenseResult,
	LoadExpenseUseCase
} from "@/domain/usecases/expense/load-expense.usecase";
import { LoadExpenseRepository } from "../protocols/load-expense-repository.protocol";

@Injectable()
export class LoadExpenseService implements LoadExpenseUseCase {
	constructor(private readonly loadExpenseRepository: LoadExpenseRepository) {}

	async execute({ page, pageSize, userId }: LoadExpenseParam): Promise<LoadExpenseResult> {
		const expenses = await this.loadExpenseRepository.load({
			userId,
			page,
			limit: pageSize
		});

		const data = expenses.map((expense) => ({
			id: expense.getId(),
			amount: expense.getAmount(),
			date: expense.getDate(),
			description: expense.getDescription(),
			category: expense.getCategory().getValue(),
			createdAt: expense.getCreatedAt(),
			updatedAt: expense.getUpdatedAt()
		}));

		return {
			data,
			total: expenses.length,
			page,
			pageSize
		};
	}
}
