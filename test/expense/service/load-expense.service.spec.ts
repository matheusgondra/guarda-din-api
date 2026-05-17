import { Test } from "@nestjs/testing";
import { LoadExpenseParam } from "@/domain/usecases/expense/load-expense.usecase";
import { LoadExpenseRepository } from "@/expense/protocols/load-expense-repository.protocol";
import { LoadExpenseService } from "@/expense/services/load-expense.service";

describe("LoadExpenseService", () => {
	let sut: LoadExpenseService;
	let loadExpenseRepository: LoadExpenseRepository;

	const param: LoadExpenseParam = {
		userId: "any_user_id",
		page: 1,
		pageSize: 10
	};

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				LoadExpenseService,
				{
					provide: LoadExpenseRepository,
					useValue: {
						load: jest.fn()
					}
				}
			]
		}).compile();

		sut = module.get<LoadExpenseService>(LoadExpenseService);
		loadExpenseRepository = module.get<LoadExpenseRepository>(LoadExpenseRepository);
	});

	it("Should call LoadExpenseRepository with correct values", async () => {
		const loadSpy = jest.spyOn(loadExpenseRepository, "load");

		await sut.execute(param);

		expect(loadSpy).toHaveBeenCalledWith({
			userId: param.userId,
			page: param.page,
			limit: param.pageSize
		});
	});

	it("Should throw if LoadExpenseRepository throws", async () => {
		jest.spyOn(loadExpenseRepository, "load").mockRejectedValueOnce(new Error());

		const promise = sut.execute(param);

		await expect(promise).rejects.toThrow();
	});
});
