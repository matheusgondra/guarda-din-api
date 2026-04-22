import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "@/app.module";
import { PrismaService } from "@/database/services/prisma.service";

describe("SignupController (e2e)", () => {
	const route = "/api/signup";
	const requestBody = {
		firstName: "Fulano",
		lastName: "de Tal",
		email: "fulano.de.tal@email.com",
		password: "StrongPassword123!"
	};
	const invalidRequestBody = {
		firstName: "Fulano",
		lastName: "de Tal",
		email: "invalid-email",
		password: "123"
	};

	let app: INestApplication;
	let prismaService: PrismaService;

	beforeAll(async () => {
		process.env.NODE_ENV = "test";
		const urlTest = new URL(process.env.DATABASE_URL!);
		urlTest.searchParams.set("schema", "test-e2e");
		process.env.DATABASE_URL = urlTest.toString();

		const module = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = module.createNestApplication();
		prismaService = app.get(PrismaService);

		await app.init();

		await prismaService.user.deleteMany();
	});

	afterAll(async () => {
		await prismaService.user.deleteMany();
		await prismaService.$disconnect();
		await app.close();
	});

	describe("POST /api/signup", () => {
		it("Should return 201", async () => {
			return request(app.getHttpServer())
				.post(route)
				.send(requestBody)
				.expect(({ body, status }) => {
					expect(status).toBe(201);
					expect(body).toEqual({
						id: expect.any(String),
						firstName: requestBody.firstName,
						lastName: requestBody.lastName,
						email: requestBody.email,
						createdAt: expect.any(String),
						updatedAt: expect.any(String)
					});
				});
		});

		it("Should return 400 if request body is invalid", async () => {
			return request(app.getHttpServer())
				.post(route)
				.send(invalidRequestBody)
				.expect(({ body, status }) => {
					expect(status).toBe(400);
					expect(body).toEqual({
						statusCode: 400,
						message: "Validation failed",
						errors: [
							{
								field: "email",
								message: "Invalid email address"
							},
							{
								field: "password",
								message: "password must be at least 6 characters long"
							},
							{
								field: "password",
								message: "password must contain at least one uppercase letter"
							},
							{
								field: "password",
								message: "password must contain at least one lowercase letter"
							},
							{
								field: "password",
								message: "password must contain at least one special character"
							}
						]
					});
				});
		});

		it("Should return 409 if email is already in use", async () => {
			return request(app.getHttpServer())
				.post(route)
				.send(requestBody)
				.expect(({ body, status }) => {
					expect(status).toBe(409);
					expect(body).toEqual({
						statusCode: 409,
						message: "User already exists",
						timestamp: expect.any(String)
					});
				});
		});
	});
});
