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
	});
});
