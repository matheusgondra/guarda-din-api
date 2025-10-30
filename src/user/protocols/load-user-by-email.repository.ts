import { User } from "../entities/user.entity";

export abstract class LoadUserByEmailRepository {
	abstract execute(email: string): Promise<User | null>;
}
