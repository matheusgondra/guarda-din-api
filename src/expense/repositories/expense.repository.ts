import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/database/services/prisma.service";
import { Expense } from "../entities/expense.entity";
import { ExpenseMapper } from "../mapper/expese.mapper";
import { AddExpenseRepository } from "../protocols/add-expense-repository.protocol";

@Injectable()
export class ExpenseRepository implements AddExpenseRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async add(expense: Expense): Promise<Expense> {
		const createdExpense = await this.prismaService.expense.create({
			data: {
				amount: expense.getAmount().getValue(),
				date: expense.getDate(),
				description: expense.getDescription(),
				category: {
					connect: {
						name: expense.getCategory().getValue()
					}
				},
				user: {
					connect: {
						id: expense.getUserId()
					}
				}
			}
		});

		return ExpenseMapper.toDomain(createdExpense);
	}
}
