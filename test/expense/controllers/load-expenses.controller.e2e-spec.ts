import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "@/app.module.js";
import { PrismaService } from "@/database/services/prisma.service.js";
import { Expense } from "@/expense/entities/expense.entity.js";

describe("LoadExpensesController (e2e)", () => {
	let app: INestApplication;
	let prismaService: PrismaService;
	let accessToken: string;

	const route = "/api/expense";

	beforeAll(async () => {
		const module = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = module.createNestApplication();
		app.setGlobalPrefix("api");

		prismaService = app.get(PrismaService);

		await app.init();

		await prismaService.user.deleteMany();

		const requestBody = {
			firstName: "Fulano",
			lastName: "de Tal",
			email: "fulano.de.tal@email.com",
			password: "StrongPassword123!"
		};
		const signupResult = await request(app.getHttpServer()).post("/api/signup").send(requestBody).expect(201);

		const loginRequestBody = {
			email: requestBody.email,
			password: requestBody.password
		};
		const loginResult = await request(app.getHttpServer()).post("/api/login").send(loginRequestBody).expect(200);
		accessToken = loginResult.body.accessToken;

		await prismaService.expense.createMany({
			data: [
				{
					amount: 100.0,
					description: "Test Expense 1",
					date: new Date(),
					categoryId: 1,
					userId: signupResult.body.id
				},
				{
					amount: 1240.32,
					description: "Test Expense 2",
					date: new Date(),
					categoryId: 1,
					userId: signupResult.body.id
				},
				{
					amount: 1240.32,
					description: "Test Expense 3",
					date: new Date(),
					categoryId: 1,
					userId: signupResult.body.id
				}
			]
		});
	});

	afterAll(async () => {
		await prismaService.expense.deleteMany();
		await prismaService.user.deleteMany();
		await app.close();
	});

	it("Should return 200 and a list of expenses", async () => {
		const response = await request(app.getHttpServer())
			.get(route)
			.set("Authorization", `Bearer ${accessToken}`)
			.expect(200);

		expect(response.body).toEqual({
			data: [
				{
					id: expect.any(String),
					amount: 100.0,
					description: "Test Expense 1",
					date: expect.any(String),
					category: "Food",
					createdAt: expect.any(String),
					updatedAt: expect.any(String)
				},
				{
					id: expect.any(String),
					amount: 1240.32,
					description: "Test Expense 2",
					date: expect.any(String),
					category: "Food",
					createdAt: expect.any(String),
					updatedAt: expect.any(String)
				},
				{
					id: expect.any(String),
					amount: 1240.32,
					description: "Test Expense 3",
					date: expect.any(String),
					category: "Food",
					createdAt: expect.any(String),
					updatedAt: expect.any(String)
				}
			],
			meta: {
				hasNextPage: false,
				hasPreviousPage: false,
				page: 1,
				pageSize: 10,
				totalElements: 3,
				totalPages: 1
			}
		});
	});
});
