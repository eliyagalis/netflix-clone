import CreateUserDTO from "../DTOs/create.dto";
import UpdateUserDTO from "../DTOs/update.dto";
import IUser from "./IUser";


export default interface IUserRepository {

    createInitialUser(userData: CreateUserDTO): Promise<IUser>;

    findByEmail(email: string): Promise<IUser | null>;

    findUserById(id: string): Promise<IUser | null>;

    updateUser(id: string, data: UpdateUserDTO): Promise<IUser | null>;
}