import { IMongoUser, IPostgresUserDTO } from "src/adapters/userAdapter";

export interface IUserAdapter {
    convert(user: IMongoUser): IPostgresUserDTO;
  }