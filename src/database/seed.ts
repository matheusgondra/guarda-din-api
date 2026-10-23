import { PrismaPg } from "@prisma/adapter-pg";
import { Category } from "@/domain/models/category.js";
import { PrismaClient } from "@/generated/prisma/client.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const categories = Object.values(Category).filter((category) => {
	return typeof category === "object" && category instanceof Category;
});

async function main() {
	await prisma.category.createMany({
		data: categories.map((category) => ({ name: category.getValue() })),
		skipDuplicates: true
	});
}

try {
	await main();
	console.log("Categories seeded successfully.");
} catch (error) {
	console.error("Error seeding categories:", error);
} finally {
	await prisma.$disconnect();
}
