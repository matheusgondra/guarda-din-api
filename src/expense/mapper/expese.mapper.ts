import { Category } from "@/domain/models/category.js";
import { Money } from "@/domain/models/money.js";
import { Expense as Entity } from "@/generated/prisma/client.js";
import { Expense } from "../entities/expense.entity.js";

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
