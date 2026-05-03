import { Category } from "@/domain/models/category";
import { Money } from "@/domain/models/money";
import { Expense as Entity } from "@/generated/prisma/client";
import { Expense } from "../entities/expense.entity";

export class ExpenseMapper {
	static toDomain(entity: Entity): Expense {
		return new Expense({
			id: entity.id,
			date: entity.date,
			amount: new Money(entity.amount.toNumber()),
			description: entity.description,
			category: Category.fromId(entity.categoryId),
			userId: entity.userId,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt
		});
	}
}
