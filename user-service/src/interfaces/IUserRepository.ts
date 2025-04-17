import { SetPasswordDTO, SetSubscriptionDTO, SetUserDTO } from "../DTOs/set.dto";
import UpdateUserDTO from "../DTOs/update.dto";
import IUser from "./IUser";


export default interface IUserRepository {

    addInitialUser(data: SetUserDTO): Promise<IUser>;

    addUserPassword(userId: string, data: SetPasswordDTO): Promise <IUser | null>
    
    addSubscriptionId(userId: string, data: SetSubscriptionDTO): Promise <IUser | null>

    findByEmail(email: string): Promise<IUser | null>;

    findUserById(id: string): Promise<IUser | null>;

    updateUser(id: string, data: UpdateUserDTO): Promise<IUser | null>;
}