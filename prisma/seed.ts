import { PrismaPg } from "@prisma/adapter-pg";
import { Category } from "../src/domain/models/category";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const categories = Object.values(Category);

async function main() {
	await prisma.category.createMany({
		data: categories.map((name) => ({ name })),
		skipDuplicates: true
	});
}

main()
	.then(() => console.log("Categories seeded successfully."))
	.catch((error) => console.error("Error seeding categories:", error))
	.finally(async () => {
		await prisma.$disconnect();
	});
