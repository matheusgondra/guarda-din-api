import { User } from "../entities/user.entity";

export abstract class LoadUserByEmailRepository {
	abstract loadByEmail(email: string): Promise<User | null>;
}
