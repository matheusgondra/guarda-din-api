import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/database/services/prisma.service.js";
import { Expense } from "../entities/expense.entity.js";
import { ExpenseMapper } from "../mapper/expese.mapper.js";
import { AddExpenseRepository } from "../protocols/add-expense-repository.protocol.js";
import { CountExpensesRepository } from "../protocols/count-expenses-repository.protocol.js";

@Injectable()
export class ExpenseRepository implements AddExpenseRepository, CountExpensesRepository {
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

	async count(userId: string): Promise<number> {
		const count = await this.prismaService.expense.count({
			where: {
				userId
			}
		});

		return count;
	}
}
