import { User } from "../entities/user.entity.js";

export abstract class LoadUserByEmailRepository {
	abstract loadByEmail(email: string): Promise<User | null>;
}
