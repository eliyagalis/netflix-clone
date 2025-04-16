import IProfile from "./IProfile";
import IUser, { UserStatus } from "./IUser";

export default interface IUserBuilder {
    withEmailAndPassword(email: string, password: string): IUserBuilder;
    withPersonalInformation(firstName: string, lastName: string, phoneNumber?: string): IUserBuilder;
    withSubscription(subscriptionId: string): IUserBuilder;
    withProfile(profile: IProfile): IUserBuilder;
    withStatus(status: UserStatus): IUserBuilder;
    activate(): IUserBuilder;
    build(): Partial<IUser>;
  }