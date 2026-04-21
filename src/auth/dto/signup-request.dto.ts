import { createZodDto } from "nestjs-zod";
import z from "zod";

export const signupRequestSchema = z
	.object({
		firstName: z.string().min(3),
		lastName: z.string().min(3),
		email: z.email(),
		password: z
			.string()
			.min(6, "password must be at least 6 characters long")
			.regex(/[A-Z]/, "password must contain at least one uppercase letter")
			.regex(/[a-z]/, "password must contain at least one lowercase letter")
			.regex(/\d/, "password must contain at least one number")
			.regex(/[@$!%*?&]/, "password must contain at least one special character")
	})
	.required();

export class SignupRequestDTO extends createZodDto(signupRequestSchema) {}
