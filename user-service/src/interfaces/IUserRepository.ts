import { SetPasswordDTO, SetSubscriptionDTO, SetUserDTO } from "../DTOs/set.dto";
import SignupRequestDTO from "../DTOs/signup.dto";
import UpdateUserDTO, { addMyListItemDTO, addProfileDTO } from "../DTOs/update.dto";
import IUser from "./IUser";


export default interface IUserRepository {

    addInitialUser(data: SignupRequestDTO): Promise<IUser | null>;

    addSubscriptionId(userId: string, data: SetSubscriptionDTO): Promise <IUser | null>

    findByEmail(email: string): Promise<IUser | null>;

    findUserById(id: string): Promise<IUser | null>;

    updateUser(id: string, data: UpdateUserDTO): Promise<IUser | null>;

    addProfile(userId: string, profileDTO: addProfileDTO): Promise<IUser | null>

    addMyListItem(userId: string, profileId: string, itemDTO: addMyListItemDTO): Promise<boolean>
}