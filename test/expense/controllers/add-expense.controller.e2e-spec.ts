import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "@/app.module";
import { PrismaService } from "@/database/services/prisma.service";

describe("AddExpenseController (e2e)", () => {
	let app: INestApplication;
	let prismaService: PrismaService;
	let accessToken: string;

	const route = "/api/expense/add";
	const requestBody = {
		amount: 110.23,
		description: "Pizza",
		date: new Date().toISOString(),
		category: "Food"
	};
	const invalidBody = {
		...requestBody,
		description: ""
	};

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
		await request(app.getHttpServer()).post("/api/signup").send(requestBody).expect(201);

		const loginRequestBody = {
			email: requestBody.email,
			password: requestBody.password
		};
		const loginResult = await request(app.getHttpServer()).post("/api/login").send(loginRequestBody).expect(200);
		accessToken = loginResult.body.accessToken;
	});

	afterAll(async () => {
		await prismaService.expense.deleteMany();
		await prismaService.user.deleteMany();
		await app.close();
	});

	it("Should return 201 and created expense", async () => {
		return request(app.getHttpServer())
			.post(route)
			.set("Authorization", `Bearer ${accessToken}`)
			.send(requestBody)
			.expect(({ body, status }) => {
				expect(status).toBe(201);
				expect(body).toEqual({
					id: expect.any(String),
					amount: requestBody.amount,
					description: requestBody.description,
					date: requestBody.date,
					category: requestBody.category,
					createdAt: expect.any(String),
					updatedAt: expect.any(String)
				});
			});
	});

	it("Should return 401 if request is invalid", async () => {
		return request(app.getHttpServer())
			.post(route)
			.set("Authorization", `Bearer ${accessToken}`)
			.send(invalidBody)
			.expect(400);
	});
});
