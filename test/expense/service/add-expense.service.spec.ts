import { Test } from "@nestjs/testing";
import { UserMock } from "@test/user/mock/user.mock.js";
import { Category } from "@/domain/models/category.js";
import { Money } from "@/domain/models/money.js";
import { AddExpenseParam, AddExpenseResult } from "@/domain/usecases/expense/add-expense.usecase.js";
import { AddExpenseRepository } from "@/expense/protocols/add-expense-repository.protocol.js";
import { AddExpenseService } from "@/expense/services/add-expense.service.js";
import { ExpenseMock } from "../mock/expense.mock.js";

describe("AddExpenseService", () => {
	let sut: AddExpenseService;
	let addExpenseRepository: AddExpenseRepository;

	const param: AddExpenseParam = {
		userId: new UserMock().getId(),
		amount: new Money(100),
		category: Category.FOOD,
		date: new Date("2023-11-23"),
		description: "any_description"
	};
	const expenseMock = new ExpenseMock();
	const expectedResult: AddExpenseResult = {
		id: expenseMock.getId(),
		amount: expenseMock.getAmount(),
		category: expenseMock.getCategory(),
		date: expenseMock.getDate(),
		description: expenseMock.getDescription(),
		createdAt: expenseMock.getCreatedAt(),
		updatedAt: expenseMock.getUpdatedAt()
	};

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				AddExpenseService,
				{
					provide: AddExpenseRepository,
					useValue: {
						add: vi.fn().mockResolvedValue(expenseMock)
					}
				}
			]
		}).compile();

		sut = module.get<AddExpenseService>(AddExpenseService);
		addExpenseRepository = module.get<AddExpenseRepository>(AddExpenseRepository);
	});

	it("Should call AddExpenseRepository with correct value", async () => {
		const addSpy = vi.spyOn(addExpenseRepository, "add");

		await sut.execute(param);

		expect(addSpy).toHaveBeenCalledWith({
			...expenseMock,
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
			id: ""
		});
	});

	it("Should throw if AddExpenseRepository throws", async () => {
		vi.spyOn(addExpenseRepository, "add").mockRejectedValueOnce(new Error());

		const promise = sut.execute(param);

		await expect(promise).rejects.toThrow();
	});

	it("Should return an AddExpenseResult on success", async () => {
		const result = await sut.execute(param);

		expect(result).toEqual(expectedResult);
	});
});
