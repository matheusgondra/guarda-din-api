import { loadEnvFile } from "node:process";
import { defineConfig } from "prisma/config";

loadEnvFile();

export default defineConfig({
	schema: "prisma/schema.prisma",
	migrations: {
		path: "prisma/migrations"
	},
	datasource: {
		url: process.env.DATABASE_URL
	}
});
