import { IUser } from "./IUser";

export interface IUserBuilder {
    setName(name: string): IUserBuilder;
    setEmail(email: string): IUserBuilder;
    setPassword(password: string): IUserBuilder;
    setId(id: string): IUserBuilder;
    build(): IUser;
}