
import IUser from "./IUser";


/**
 * Adapter for converting between domain models and database models
 */
export default interface IUserAdapter {
  /**
   * Convert database user to domain user model
   */
  toDomainUser(dbUser: any): IUser;
}