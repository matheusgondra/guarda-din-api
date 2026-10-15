import { Test } from "@nestjs/testing";
import { LoadExpenseParam } from "@/domain/usecases/expense/load-expense.usecase.js";
import { CountExpensesRepository } from "@/expense/protocols/count-expenses-repository.protocol.js";
import { LoadExpenseRepository } from "@/expense/protocols/load-expense-repository.protocol.js";
import { LoadExpenseService } from "@/expense/services/load-expense.service.js";
import { ExpenseMock } from "../mock/expense.mock.js";

describe("LoadExpenseService", () => {
	let sut: LoadExpenseService;
	let loadExpenseRepository: LoadExpenseRepository;
	let countExpensesRepository: CountExpensesRepository;

	const param: LoadExpenseParam = {
		userId: "any_user_id",
		page: 1,
		pageSize: 10
	};

	const mockedExpense = new ExpenseMock();

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				LoadExpenseService,
				{
					provide: LoadExpenseRepository,
					useValue: {
						load: vi.fn().mockResolvedValue([mockedExpense])
					}
				},
				{
					provide: CountExpensesRepository,
					useValue: {
						count: vi.fn().mockResolvedValue(1)
					}
				}
			]
		}).compile();

		sut = module.get<LoadExpenseService>(LoadExpenseService);
		loadExpenseRepository = module.get<LoadExpenseRepository>(LoadExpenseRepository);
		countExpensesRepository = module.get<CountExpensesRepository>(CountExpensesRepository);
	});

	it("Should call LoadExpenseRepository with correct values", async () => {
		const loadSpy = vi.spyOn(loadExpenseRepository, "load");

		await sut.execute(param);

		expect(loadSpy).toHaveBeenCalledWith({
			userId: param.userId,
			page: param.page,
			limit: param.pageSize
		});
	});

	it("Should throw if LoadExpenseRepository throws", async () => {
		vi.spyOn(loadExpenseRepository, "load").mockRejectedValueOnce(new Error());

		const promise = sut.execute(param);

		await expect(promise).rejects.toThrow();
	});

	it("Should call CountExpensesRepository with correct value", async () => {
		const countSpy = vi.spyOn(countExpensesRepository, "count");

		await sut.execute(param);

		expect(countSpy).toHaveBeenCalledWith(param.userId);
	});

	it("Should return LoadExpenseResult on success", async () => {
		const result = await sut.execute(param);

		expect(result).toEqual({
			data: [
				{
					id: mockedExpense.getId(),
					amount: mockedExpense.getAmount(),
					date: mockedExpense.getDate(),
					description: mockedExpense.getDescription(),
					category: mockedExpense.getCategory().getValue(),
					createdAt: mockedExpense.getCreatedAt(),
					updatedAt: mockedExpense.getUpdatedAt()
				}
			],
			total: 1,
			page: 1,
			pageSize: 10
		});
	});
});
