import { ApiProperty } from "@nestjs/swagger";

export class ErrorResponseDTO {
	@ApiProperty({
		description: "HTTP status code of the error",
		example: 409
	})
	statusCode: number;

	@ApiProperty({
		description: "Error message describing the reason for the error",
		example: "User already exists"
	})
	message: string;

	@ApiProperty({
		description: "Timestamp when the error occurred",
		example: "2024-01-01T00:00:00.000Z"
	})
	timestamp: string;

	constructor(statusCode: number, message: string) {
		this.statusCode = statusCode;
		this.message = message;
		this.timestamp = new Date().toISOString();
	}
}
