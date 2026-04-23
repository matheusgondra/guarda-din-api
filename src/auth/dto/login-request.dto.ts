import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const loginRequestSchema = z.object({
	email: z.email(),
	password: z.string()
});

export class LoginRequestDTO extends createZodDto(loginRequestSchema) {}
