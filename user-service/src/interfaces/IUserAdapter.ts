
import IMongoMyListItem from "./IMongoMyListItem";
import IMongoProfile from "./IMongoProfile";
import IMongoUser from "./IMongoUser";
import IMyListItem from "./IMyListItem";
import IProfile from "./IProfile";
import IUser from "./IUser";


/**
 * Adapter for converting between domain models and database models
 */
export default interface IUserAdapter {
  /**
   * Convert database user to domain user model
   */
  toDomainUser(dbUser: IMongoUser): IUser;

  toDbUser(userData: Partial<IUser>) : Partial<IMongoUser>;

  toDomainProfile(dbProfile: IMongoProfile): IProfile;

  toDbProfile(profile: Partial<IProfile>): IMongoProfile;

  toDomainMyListItem(mongoListItem: IMongoMyListItem): IMyListItem;

  toDbMyListItem(myListItem: Partial<IMyListItem>): IMongoMyListItem;
}