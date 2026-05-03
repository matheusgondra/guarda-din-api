import { Test } from "@nestjs/testing";
import { PrismaService } from "@/database/services/prisma.service";
import { ExpenseRepository } from "@/expense/repositories/expense.repository";
import { ExpenseMock } from "../mock/expense.mock";

describe("ExpenseRepository", () => {
	let sut: ExpenseRepository;
	let prismaService: PrismaService;

	const expenseMock = new ExpenseMock();

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				ExpenseRepository,
				{
					provide: PrismaService,
					useValue: {
						expense: {
							create: jest.fn().mockResolvedValue({
								id: expenseMock.getId(),
								amount: expenseMock.getAmount().getValue(),
								description: expenseMock.getDescription(),
								date: expenseMock.getDate(),
								userId: expenseMock.getUserId(),
								categoryId: 1,
								createdAt: expenseMock.getCreatedAt(),
								updatedAt: expenseMock.getUpdatedAt()
							})
						}
					}
				}
			]
		}).compile();

		sut = module.get<ExpenseRepository>(ExpenseRepository);
		prismaService = module.get<PrismaService>(PrismaService);
	});

	describe("add", () => {
		it("Should call prismaService.expense.create with correct values", async () => {
			const createSpy = jest.spyOn(prismaService.expense, "create");

			await sut.add(expenseMock);

			expect(createSpy).toHaveBeenCalledWith({
				data: {
					amount: expenseMock.getAmount().getValue(),
					date: expenseMock.getDate(),
					description: expenseMock.getDescription(),
					category: {
						connect: {
							name: expenseMock.getCategory().getValue()
						}
					},
					user: {
						connect: {
							id: expenseMock.getUserId()
						}
					}
				}
			});
		});

		it("Should throw if prismaService.expense.create throws", async () => {
			jest.spyOn(prismaService.expense, "create").mockRejectedValueOnce(new Error("Database error"));

			const promise = sut.add(expenseMock);

			await expect(promise).rejects.toThrow("Database error");
		});

		it("Should return an expense on success", async () => {
			const expense = await sut.add(expenseMock);

			expect(expense).toEqual({
				id: expenseMock.getId(),
				amount: expenseMock.getAmount(),
				description: expenseMock.getDescription(),
				date: expenseMock.getDate(),
				userId: expenseMock.getUserId(),
				category: expenseMock.getCategory(),
				createdAt: expenseMock.getCreatedAt(),
				updatedAt: expenseMock.getUpdatedAt()
			});
		});
	});
});
