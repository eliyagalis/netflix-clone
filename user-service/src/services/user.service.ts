import { injectable, inject } from 'inversify';
import { TOKENS } from '../tokens';
import IUserRepository from '../interfaces/IUserRepository';
import IUserService from '../interfaces/IUserService';
import UpdateUserDTO, { addMyListItemDTO, addProfileDTO } from '../DTOs/update.dto';
import IUser, { isActiveUser, UserStatus } from '../interfaces/IUser';
import IProfile from '../interfaces/IProfile';
import IMyListItem from '../interfaces/IMyListItem';
import SignupRequestDTO from '../DTOs/signup.dto';
import { hash } from '../utils/bcrypt';
import IAuthService from '../interfaces/IAuthService';
import ITokenResponse from '../interfaces/ITokenResponse';
import IUserPayload from '../interfaces/IUserPayload';
import IUserBuilder from '../interfaces/IUserBuilder';
import { SetPasswordDTO, SetSubscriptionDTO } from '../DTOs/set.dto';
import UserBuilder from '../builders/user.builder';
import LoginRequestDTO from '../DTOs/login.dto';

@injectable()
export class UserService implements IUserService {

  constructor(
    @inject(TOKENS.IUserRepository) private userRepository: IUserRepository,
    @inject(TOKENS.IAuthService) private authService: IAuthService,
    @inject(TOKENS.IUserBuilder) private userBuilder: IUserBuilder
  ) { }

  /**
   * Sign up a new user with email
   */
  async signup(data: SignupRequestDTO): Promise<ITokenResponse> {

    const { email, password } = data;
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error('Email already registered');
    }

    const hashedPassword: string = await hash(password);

    const partialUser = new UserBuilder();
    partialUser.withEmailAndPassword(email, hashedPassword)

    const newUser: IUser | null = await this.userRepository.addInitialUser({
      email: email,
      password: hashedPassword
    })

    if (!newUser) {
      throw new Error("Error in the created user")
    }

    partialUser.withId(newUser.id).build()

    const user = partialUser.withId(newUser.id).build()

    if (!user) {
      throw new Error("Problem in user build")
    }

    const userPayload: IUserPayload = {
      userId: user.id,
      email: user.email
    }
    
    return this.authService.login(userPayload, password, user.password);
  }
  /**
   * Add subscription for a user
   */
  async addSubscription(userId: string, data: SetSubscriptionDTO): Promise<IUser> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = await this.userRepository.addSubscriptionId(userId, data);
    if (!updatedUser) {
      throw new Error('Failed to update subscription');
    }

    return updatedUser;
  }

  /**
   * Login a user and generate tokens
   */
  async login(data: LoginRequestDTO): Promise<ITokenResponse> {

    const {email , password } = data

    // Find user by email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Create user payload for token
    const userPayload: IUserPayload = {
      userId: user.id,
      email: user.email
    };

    // Use auth service to login and generate tokens
    return await this.authService.login(userPayload, password, user.password);
  }


  //add getuser by token
  //add getProfiles by token
  //add get mylist by token
  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshToken: string): Promise<string | null> {
    return this.authService.refreshAccessToken(refreshToken);
  }

  /**
   * Find user by ID
   */
  async findUserById(id: string): Promise<IUser | null> {
    return this.userRepository.findUserById(id);
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<IUser | null> {
    return this.userRepository.findByEmail(email);
  }

  /**
   * Update user information
   */
  async updateUser(id: string, data: UpdateUserDTO): Promise<IUser | null> {
    // If password is included, hash it first
    if (data.password) {
      data.password = await hash(data.password);
    }

    return this.userRepository.updateUser(id, data);
  }

  /**
   * Add a profile to a user account
   */
  async addProfile(userId: string, profileData: addProfileDTO): Promise<IUser | null> {
    return this.userRepository.addProfile(userId, profileData);
  }

  /**
   * Add an item to a user's profile watchlist
   */
  async addToMyList(userId: string, profileId: string, itemData: addMyListItemDTO): Promise<boolean> {
    return this.userRepository.addMyListItem(userId, profileId, itemData);
  }
}