import { SetPasswordDTO, SetSubscriptionDTO, SetUserDTO } from "../DTOs/set.dto";
import SignupRequestDTO from "../DTOs/signup.dto";
import {UpdateRequestDTO, AddMyListItemDTO, AddProfileDTO } from "../DTOs/update.dto";
import IProfile from "./IProfile";
import IUser from "./IUser";


export default interface IUserRepository {

    addInitialUser(data: SignupRequestDTO): Promise<IUser | null>;

    addSubscriptionId(userId: string, data: SetSubscriptionDTO): Promise <IUser | null>

    findByEmail(email: string): Promise<IUser | null>;

    findUserById(id: string): Promise<IUser | null>;

    updateUser(id: string, data: UpdateRequestDTO): Promise<IUser | null>;

    addProfile(userId: string, profileDTO: AddProfileDTO): Promise<IUser | null>

    addMyListItem(userId: string, profileId: string, itemDTO: AddMyListItemDTO): Promise<boolean>

    getProfiles(userId: string) : Promise<IProfile[] | null> 
}