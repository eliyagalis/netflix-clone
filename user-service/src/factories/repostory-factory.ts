import { injectable } from "inversify";
import IUserRepository from "../interfaces/IUserRepository";
import { UserMongoRepository } from "../repositories/user-mongo.repository";
import { TOKENS } from "../tokens";
import IUserAdapter from "../interfaces/IUserAdapter";
import IStatusService from "../interfaces/IStatusService";

@injectable()
export class UserRepositoryFactory {
    public static createRepository(dbType:string, userAdapter: IUserAdapter, statusService: IStatusService): IUserRepository {
        switch (dbType) {
            case TOKENS.mongodb:
                return new UserMongoRepository(userAdapter, statusService);
            //add more casses for different db's
            default:
                throw new Error("Unsupported db type");
        }
    }
}