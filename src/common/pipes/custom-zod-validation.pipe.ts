import { BadRequestException, PipeTransform, Type } from "@nestjs/common";
import { createZodValidationPipe } from "nestjs-zod";
import { ZodError } from "zod";

export const CustomZodValidationPipe: Type<PipeTransform> = createZodValidationPipe({
	createValidationException: (zodError) => {
		if (!(zodError instanceof ZodError)) {
			return new BadRequestException("Invalid input data");
		}

		const errors = zodError.issues.map((issue) => ({
			field: issue.path.join("."),
			message: issue.message
		}));
		return new BadRequestException({ statusCode: 400, message: "Validation failed", errors });
	},
	strictSchemaDeclaration: true
});
