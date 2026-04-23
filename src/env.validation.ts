import z from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
	PORT: z.coerce.number().positive().int().default(3000),
	DATABASE_URL: z.url(),
	SALT: z.coerce.number().positive().int().default(12),
	JWT_SECRET: z.string().min(10)
});

export type Env = z.infer<typeof envSchema>;

export const validateEnv = (config: Record<string, unknown>) => envSchema.parse(config);
