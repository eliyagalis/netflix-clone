import { injectable, inject } from 'inversify';
import { TOKENS } from '../tokens';
import IUserRepository from '../interfaces/IUserRepository';
import IUserService from '../interfaces/IUserService';
import { UpdateRequestDTO, AddMyListItemDTO, AddProfileDTO } from '../DTOs/update.dto';
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
import { EventBus, EventTypes, PaymentSuccessEvent, SubscriptionCanceledEvent, SubscriptionUpdatedEvent, } from '../utils/eventBus';
import { handleError } from '../utils/handle-error-request';

@injectable()
export class UserService implements IUserService {

  constructor(
    @inject(TOKENS.IUserRepository) private userRepository: IUserRepository,
    @inject(TOKENS.IAuthService) private authService: IAuthService,
    @inject(TOKENS.IUserBuilder) private userBuilder: IUserBuilder,
    @inject(TOKENS.EventBus) private eventBus: EventBus
  ) {
    this.initEventSubscriptions();
  }

  private initEventSubscriptions(): void {
    // Handle payment success events
    this.eventBus.subscribe(EventTypes.PAYMENT_SUCCESS,
      async (event: PaymentSuccessEvent) => {
        try {
          await this.handlePaymentSuccess(event);
        } catch (error) {
          console.error('Error handling payment success event:', error);
        }
      }
    );

    this.eventBus.subscribe(EventTypes.SUBSCRIPTION_CANCELED,
      async (event: SubscriptionCanceledEvent) => {
        try {
          await this.handleSubscriptionCanceled(event);
        } catch (error) {
          console.error('Error handling subscription canceled event:', error);
        }
      }
    );

    this.eventBus.subscribe(EventTypes.SUBSCRIPTION_UPDATED,
      async (event: SubscriptionUpdatedEvent) => {
        try {
          await this.handleSubscriptionUpdated(event);
        } catch (error) {
          console.error('Error handling subscription updated event:', error);
        }
      }
    );
  }

  private async handlePaymentSuccess(event: PaymentSuccessEvent): Promise<void> {
    const { userId, subscriptionId, planId } = event;
    console.log(`Handling payment success for user ${userId} with subscription ${subscriptionId}`);

    await this.updateSubscription(userId, {
      subscriptionId,
      // planId,
      // status: 'active',
      updatedAt: new Date()
    });
  }

  private async handleSubscriptionCanceled(event: SubscriptionCanceledEvent): Promise<void> {
    const { userId, subscriptionId } = event;
    console.log(`Handling subscription canceled for user ${userId} with subscription ${subscriptionId}`);

    await this.updateSubscription(userId, {
      subscriptionId,
      // planId: '',  // Clear plan ID
      // status: 'canceled',
      updatedAt: new Date()
    });
  }

  private async handleSubscriptionUpdated(event: SubscriptionUpdatedEvent): Promise<void> {
    const { userId, subscriptionId, planId, status } = event;
    console.log(`Handling subscription update for user ${userId} with subscription ${subscriptionId}`);

    await this.updateSubscription(userId, {
      subscriptionId,
      // planId,
      // status,
      updatedAt: new Date()
    });
  }
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

    const user = partialUser.withId(newUser.id).build()

    if (!user) {
      throw new Error("Error in user build")
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
  async login(data: LoginRequestDTO): Promise<{ tokens: ITokenResponse, profiles: Partial<IProfile>[], status:UserStatus }> {

    const { email, password } = data

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
    const tokens = await this.authService.login(userPayload, password, user.password);

    const profiles = await this.getProfiles(user.id);

    return {
      tokens,
      profiles,
      status: user.status
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshToken: string): Promise<ITokenResponse> {
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
  async updateUser(id: string, data: UpdateRequestDTO): Promise<IUser | null> {
    // If password is included, hash it first
    if (data.password) {
      data.password = await hash(data.password);
    }

    return this.userRepository.updateUser(id, data);
  }

  /**
   * Add a profile to a user account
   */
  async addProfile(userId: string, profileData: AddProfileDTO): Promise<IUser | null> {
    return this.userRepository.addProfile(userId, profileData);
  }

  /**
   * Add an item to a user's profile watchlist
   */
  async addToMyList(userId: string, profileId: string, itemData: AddMyListItemDTO): Promise<boolean> {
    return this.userRepository.addMyListItem(userId, profileId, itemData);
  }

  async getProfiles(userId: string): Promise<Partial<IProfile>[]> {
    const profiles = await this.userRepository.getProfiles(userId);

    if (!profiles) {
      throw new Error('User not found')
    }

    const partialProfile = profiles?.map(profile => {
      return {
        id: profile.id,
        name: profile.name,
        avater: profile.avatar
      }
    })

    return partialProfile;
  }

  async getDetailedProfile(userId: string, profileId: string): Promise<IProfile> {

    const profiles = await this.userRepository.getProfiles(userId);

    if (!profiles) {
      throw new Error('User not found');
    }

    const detailedProfile = profiles.find(profile => profile.id === profileId);

    if (!detailedProfile) {
      throw new Error('Profile not found');
    }

    return detailedProfile;

  }

  async updateSubscription(userId: string, subscriptionData: {
    subscriptionId: string;
    // planId: string; 
    updatedAt: Date;
  }): Promise<IUser | null> {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new Error(`User not found: ${userId}`);
    }

    const updatedUser = {
      ...user,
      subscriptionId: subscriptionData.subscriptionId,
      // planId: subscriptionData.planId,
      updatedAt: subscriptionData.updatedAt
    };

    const res = await this.userRepository.updateUser(userId, updatedUser);

    if (!res) {
      throw new Error("Error updating subscription for user");
    }

    return res;
  }
}


