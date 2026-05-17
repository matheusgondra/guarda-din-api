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
		await this.loadExpenseRepository.load({
			userId,
			page,
			limit: pageSize
		});
		return {} as LoadExpenseResult;
	}
}
