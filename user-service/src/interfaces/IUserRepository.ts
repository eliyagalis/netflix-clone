import SignupRequestDTO from "../DTOs/signup.dto";
import { UpdateUserDTO } from "../DTOs/update.dto";
import { IUser } from "./IUser";


export default interface IUserRepository {
  create(data: SignupRequestDTO): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  findUserById(id: string): Promise<IUser | null>;
  updateUser(id: string, data: UpdateUserDTO): Promise<IUser | null>;
}