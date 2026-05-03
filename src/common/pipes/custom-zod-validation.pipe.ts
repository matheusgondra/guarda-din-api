import { BadRequestException, PipeTransform, Type } from "@nestjs/common";
import { createZodValidationPipe } from "nestjs-zod";
import { ZodError } from "zod";
import { ValidationErrorResponseDTO } from "../dto/validation-error-response.dto";

export const CustomZodValidationPipe: Type<PipeTransform> = createZodValidationPipe({
	createValidationException: (zodError) => {
		if (!(zodError instanceof ZodError)) {
			return new BadRequestException("Invalid input data");
		}

		const errors = zodError.issues.map((issue) => ({
			field: issue.path.join("."),
			message: issue.message
		}));
		const validationErrorResponse = new ValidationErrorResponseDTO(errors);
		return new BadRequestException(validationErrorResponse);
	},
	strictSchemaDeclaration: false
});
