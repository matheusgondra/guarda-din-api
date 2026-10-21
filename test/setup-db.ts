import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";

if (existsSync(".env.test")) {
	loadEnvFile(".env.test");
}

console.log("🔄 Sincronizando o banco de dados de teste...");

execSync("pnpm prisma db push --force-reset", { stdio: "inherit" });
execSync("pnpm prisma db seed", { stdio: "inherit" });

console.log("✅ Banco de dados de teste pronto!");
