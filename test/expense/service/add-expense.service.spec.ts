import { Test } from "@nestjs/testing";
import { Category } from "@/domain/models/category";
import { Money } from "@/domain/models/money";
import { AddExpenseParam } from "@/domain/usecases/expense/add-expense.usecase";
import { AddExpenseRepository } from "@/expense/protocols/add-expense-repository.protocol";
import { AddExpenseService } from "@/expense/services/add-expense.service";
import { ExpenseMock } from "../mock/expense.mock";

describe("AddExpenseService", () => {
	let sut: AddExpenseService;
	let addExpenseRepository: AddExpenseRepository;

	const param: AddExpenseParam = {
		amount: new Money(100),
		category: Category.Food,
		date: new Date("2023-11-23"),
		description: "any_description"
	};
	const expenseMock = new ExpenseMock();

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				AddExpenseService,
				{
					provide: AddExpenseRepository,
					useValue: {
						add: jest.fn()
					}
				}
			]
		}).compile();

		sut = module.get<AddExpenseService>(AddExpenseService);
		addExpenseRepository = module.get<AddExpenseRepository>(AddExpenseRepository);
	});

	it("Should call AddExpenseRepository with correct value", async () => {
		const addSpy = jest.spyOn(addExpenseRepository, "add");

		await sut.execute(param);

		expect(addSpy).toHaveBeenCalledWith({
			...expenseMock,
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
			id: ""
		});
	});

	it("Should throw if AddExpenseRepository throws", async () => {
		jest.spyOn(addExpenseRepository, "add").mockRejectedValueOnce(new Error());

		const promise = sut.execute(param);

		await expect(promise).rejects.toThrow();
	});
});
