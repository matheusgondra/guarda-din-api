import path from "node:path";
import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		root: "./",
		environment: "node",
		include: ["src/**/*.spec.ts", "test/**/*.spec.ts"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			reportsDirectory: "./coverage",
			include: ["src/**/*.ts"],
			exclude: ["src/main.ts", "src/**/*.module.ts", "src/**/*.dto.ts"]
		}
	},
	resolve: {
		alias: {
			"@": path.resolve(import.meta.dirname, "./src"),
			"@test": path.resolve(import.meta.dirname, "./test"),
			"@user": path.resolve(import.meta.dirname, "./src/user"),
			"@auth": path.resolve(import.meta.dirname, "./src/auth"),
			"@domain": path.resolve(import.meta.dirname, "./src/domain"),
			"@crypto": path.resolve(import.meta.dirname, "./src/cryptography")
		}
	},
	plugins: [
		swc.vite({
			module: { type: "es6" }
		})
	]
});
