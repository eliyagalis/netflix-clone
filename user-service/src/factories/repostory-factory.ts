import { injectable } from "inversify";
import IUserRepository from "../interfaces/IUserRepository";
import { UserMongoRepository } from "../repositories/user-mongo.repository";
import { TOKENS } from "../tokens";
import IUserAdapter from "../interfaces/IUserAdapter";

@injectable()
export class UserRepositoryFactory {
    public static createRepository(dbType:string, userAdapter: IUserAdapter): IUserRepository {
        switch (dbType) {
            case TOKENS.mongodb:
                return new UserMongoRepository(userAdapter);
            //add more casses for different db's
            default:
                throw new Error("Unsupported db type");
        }
    }
}