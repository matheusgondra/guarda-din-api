import { ApiProperty } from "@nestjs/swagger";
import { ErrorResponseDTO } from "./error-response.dto";

class ValidationErrorDetail {
	@ApiProperty({
		description: "The name of the field that failed validation",
		example: "email"
	})
	field: string;

	@ApiProperty({
		description: "The error message describing why the validation failed for this field",
		example: "Email must be a valid email address"
	})
	message: string;

	constructor(field: string, message: string) {
		this.field = field;
		this.message = message;
	}
}

export class ValidationErrorResponseDTO extends ErrorResponseDTO {
	@ApiProperty({
		description: "A list of validation errors",
		example: [
			{
				field: "email",
				message: "Email must be a valid email address"
			}
		]
	})
	errors: ValidationErrorDetail[];

	constructor(errors: ValidationErrorDetail[]) {
		super(400, "Validation failed");
		this.errors = errors;
	}
}
