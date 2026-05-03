export type CategoryValue =
	| "Food"
	| "Transport"
	| "Housing"
	| "Health"
	| "Education"
	| "Leisure"
	| "Clothing"
	| "Others";

export class Category {
	static readonly FOOD = new Category("Food");
	static readonly TRANSPORT = new Category("Transport");
	static readonly HOUSING = new Category("Housing");
	static readonly HEALTH = new Category("Health");
	static readonly EDUCATION = new Category("Education");
	static readonly LEISURE = new Category("Leisure");
	static readonly CLOTHING = new Category("Clothing");
	static readonly OTHERS = new Category("Others");

	private static readonly categoryList = [
		Category.FOOD,
		Category.TRANSPORT,
		Category.HOUSING,
		Category.HEALTH,
		Category.EDUCATION,
		Category.LEISURE,
		Category.CLOTHING,
		Category.OTHERS
	];

	private constructor(private readonly value: string) {}

	static from(value: string): Category {
		const match = Object.values(Category).find((category) => category.getValue() === value);

		return match || Category.OTHERS;
	}

	static fromId(id: number): Category {
		if (id < 0 || id >= Category.categoryList.length) {
			return Category.OTHERS;
		}

		return Category.categoryList[id];
	}

	getValue(): string {
		return this.value;
	}
}
