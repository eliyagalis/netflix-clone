import IUser from './IUser';
import IProfile from './IProfile';
import UpdateUserDTO from '../DTOs/update.dto';
import { SetPasswordDTO, SetSubscriptionDTO } from '../DTOs/set.dto';
import SignupRequestDTO from '../DTOs/signup.dto';
import ITokenResponse from './ITokenResponse';
import LoginRequestDTO from '../DTOs/login.dto';

export default interface IUserService {
  /**
   * Sign up a new user with email
   */
  signup(data: SignupRequestDTO): Promise<ITokenResponse>;
 
  /**
   * Add subscription for a user
   */
  addSubscription(userId: string, data: SetSubscriptionDTO): Promise<IUser>;
  
  /**
   * Login a user and generate tokens
   */
  login(data: LoginRequestDTO): Promise<{tokens: ITokenResponse, profiles: Partial<IProfile>[]}>;
  
  /**
   * Refresh access token using refresh token
   */
  refreshToken(refreshToken: string): Promise<string | null>;
  
  /**
   * Find user by ID
   */
  findUserById(id: string): Promise<IUser | null>;
  
  /**
   * Find user by email
   */
  findByEmail(email: string): Promise<IUser | null>;
  
  /**
   * Update user information
   */
  updateUser(id: string, data: UpdateUserDTO): Promise<IUser | null>;
  
  /**
   * Add a profile to a user account
   */
  addProfile(userId: string, profileData: { name: string, avatar?: string, isKid?: boolean }): Promise<IUser | null>;
  
  /**
   * Add an item to a user's profile watchlist
   */
  addToMyList(userId: string, profileId: string, itemData: { contentId: string, type: string }): Promise<boolean>;

  getProfiles(userId: string) : Promise<Partial<IProfile>[] | null>
}