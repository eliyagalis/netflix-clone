import { injectable } from "inversify";
import { IUserAdapter } from "src/interfaces/IUserAdapter";

export interface IMongoUser {
    _id: string; // objectId
    email?: string;
  }
  
 export interface IPostgresUserDTO  {
    user_id: string; 
    email?: string;
  }
@injectable()
export class MongoToPostgresAdapter implements IUserAdapter {
    convert = (user: IMongoUser): IPostgresUserDTO => {
        if (!user._id) {
            throw new Error("Invalid user: '_id' is required");
        }
        return {
            user_id: user['_id'].toString(),
            email: user.email || ""
        };
    }
};

