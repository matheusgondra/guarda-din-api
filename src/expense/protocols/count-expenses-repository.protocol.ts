export abstract class CountExpensesRepository {
	abstract count(userId: string): Promise<number>;
}
