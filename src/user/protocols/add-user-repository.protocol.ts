import { User } from "../entities/user.entity.js";

export abstract class AddUserRepository {
	abstract add(user: User): Promise<User>;
}
