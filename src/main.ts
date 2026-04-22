import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";
import { AppModule } from "./app.module";
import { ErrorResponseDTO } from "./common/dto/error-response.dto";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle("GuardaDin API")
		.setDescription("API for GuardaDin application")
		.setVersion("1.0.0")
		.addGlobalResponse({
			status: 500,
			description: "Internal server error",
			type: ErrorResponseDTO,
			example: {
				statusCode: 500,
				message: "Internal server error",
				timestamp: "2024-01-01T00:00:00.000Z"
			}
		})
		.build();

	const document = SwaggerModule.createDocument(app, config);

	app.use(
		"/api/docs",
		apiReference({
			content: document,
			theme: "deepSpace",
			darkMode: true,
			pageTitle: "GuardaDin API"
		})
	);

	await app.listen(3000);
}
bootstrap();
