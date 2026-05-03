import { UserMock } from "@test/user/mock/user.mock";
import { Category } from "@/domain/models/category";
import { Money } from "@/domain/models/money";
import { Expense } from "@/expense/entities/expense.entity";

export class ExpenseMock extends Expense {
	constructor() {
		super({
			id: "019dee1c-96f0-7904-84a8-6c1e650a4f66",
			amount: new Money(100),
			date: new Date("2023-11-23"),
			description: "any_description",
			category: Category.FOOD,
			userId: new UserMock().getId(),
			createdAt: new Date(),
			updatedAt: new Date()
		});
	}
}
