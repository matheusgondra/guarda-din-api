import { User } from "../entities/user.entity";

export abstract class AddUserRepository {
	abstract add(user: User): Promise<User>;
}
