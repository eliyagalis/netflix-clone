import { injectable, inject } from 'inversify';
import { TOKENS } from '../tokens';
import IUserRepository from '../interfaces/IUserRepository';
import IUserService from '../interfaces/IUserSevice';
import UpdateUserDTO from '../DTOs/update.dto';
import IUser from '../interfaces/IUser';
import IProfile from '../interfaces/IProfile';
import IMyListItem from '../interfaces/IMyListItem';
import mongoose from 'mongoose';
import SignupRequestDTO from '../DTOs/signup.dto';
import { hash } from '../utils/bcrypt';
import { AuthService } from './auth.service';
import ITokenResponse from '../interfaces/ITokenResponse';
import IUserPayload from '../interfaces/IUserPayload';

@injectable()
export class UserService implements IUserService {

  constructor(
    @inject(TOKENS.IUserRepository) private userRepository: IUserRepository,
    @inject(TOKENS.AuthService) private authService: AuthService
  ) { }

  /**
   * Register a new user
   */
  async register(email: string, password: string, name: string): Promise<IUser> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash the password
    const passwordHash = await hash(password);

    // Create user object
    const newUser = {
      email,
      passwordHash,
      name,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Save user to database
    return this.userRepository.create(newUser);
  }

  /**
   * Authenticate user and generate tokens
   */
  async login(email: string, password: string): Promise<ITokenResponse> {
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

    // Call auth service to verify password and generate tokens
    return this.authService.login(userPayload, password, user.passwordHash);
  }

  /**
  * Refresh user's access token
  */
  async refreshToken(refreshToken: string): Promise<string> {
    try {
      // Let auth service handle token refreshing
      return this.authService.refreshAccessToken(refreshToken);
    } catch (error) {
      // Add logging here if needed
      throw new Error('Unable to refresh token');
    }
  }

  async logout(refreshToken: string): Promise<boolean> {
    // try {
    //   // Mark the token as revoked in the database
    //   return await this.userRepository.revokeRefreshToken(refreshToken);
    // } catch (error) {
    //   throw new Error('Logout failed');
    // }
    return true;
  }

  async getUserProfile(userId: string): Promise<Omit<User, 'passwordHash'>> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Remove password hash before returning
    const { passwordHash, ...userProfile } = user;
    return userProfile;
  }

  /**
   * Update user profile
   */
  async updateUserProfile(userId: string, updates: Partial<User>): Promise<Omit<User, 'passwordHash'>> {
    // Don't allow password update through this method
    if (updates.passwordHash) {
      delete updates.passwordHash;
    }

    const updatedUser = await this.userRepository.update(userId, {
      ...updates,
      updatedAt: new Date()
    });

    if (!updatedUser) {
      throw new Error('User not found');
    }

    // Remove password hash before returning
    const { passwordHash, ...userProfile } = updatedUser;
    return userProfile;
  }

  /**
   * Change user password
   */
  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<boolean> {
    // Get user with password hash
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Verify current password
    const isPasswordValid = await this.authService.verifyPassword(currentPassword, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    // Hash new password
    const newPasswordHash = await hash(newPassword);

    // Update password in database
    await this.userRepository.update(userId, {
      passwordHash: newPasswordHash,
      updatedAt: new Date()
    });

    // Revoke all refresh tokens for this user for security
    await this.userRepository.revokeAllUserTokens(userId);

    return true;
  }




}