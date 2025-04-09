import SignupRequestDTO from "../DTOs/signup.dto";
import IMyListItem from "./IMyListItem";
import IUser from "./IUser";
import UpdateUserDTO from "../DTOs/update.dto";


//#TODO
/**
 * Adapter for converting between domain models and database models
 */
export default interface IUserAdapter {
  /**
   * Convert database user to standard user model
   */
  convertToStandardUser(dbUser: any): IUser;
  
  /**
   * Prepare user data for creation in database
   */
  prepareForCreation(data: SignupRequestDTO): any;
  
  /**
   * Prepare user data for update in database
   */
  prepareForUpdate(data: UpdateUserDTO): any;
  
  /**
   * Convert database profile to standard profile model
   */
  convertProfile(dbProfile: any): any;
  
  /**
   * Prepare my list item for database
   */
  prepareMyListItem(item: IMyListItem): any;
}