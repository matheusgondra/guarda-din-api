import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "@/app.module";
import { PrismaService } from "@/database/services/prisma.service";

describe("LoginController (e2e)", () => {
	let app: INestApplication;
	let prismaService: PrismaService;

	const route = "/api/login";
	const requestBody = {
		email: "fulano.de.tal@email.com",
		password: "StrongPassword123!"
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
	});

	afterAll(async () => {
		await prismaService.user.deleteMany();
		await app.close();
	});

	describe("POST /api/login", () => {
		it("Should return 200 and access token", async () => {
			return request(app.getHttpServer())
				.post(route)
				.send(requestBody)
				.expect(({ body, status }) => {
					expect(status).toBe(200);
					expect(body).toEqual({
						accessToken: expect.any(String)
					});
				});
		});
	});
});
