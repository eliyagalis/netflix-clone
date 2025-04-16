import { inject, injectable } from "inversify";
import SignupRequestDTO from "../DTOs/signup.dto";
import IUser, { UserStatus } from "../interfaces/IUser";
import IUserRepository from "../interfaces/IUserRepository";
import UpdateUserDTO from "../DTOs/update.dto";
import { TOKENS } from "../tokens";
import IUserAdapter from "../interfaces/IUserAdapter";
import User from "../models/user-mongo.model"
import { hash } from "../utils/bcrypt"
import UserBuilder from "../builders/user.builder";

@injectable()
export class UserMongoRepository implements IUserRepository {

  constructor(
    @inject(TOKENS.IUserAdapter) private userAdapter: IUserAdapter
   )
  {}

  async createInitialUser(data: SignupRequestDTO): Promise<IUser> {

    const passwordHash = await hash(data.password);

    // Create new user
    const user = new UserBuilder()
      .withEmailAndPassword(data.email, passwordHash)
      .withStatus(UserStatus.PENDING)
      .build();

    mongoUserData = this.userAdapter.toDomainUser()
    return {
      id: savedUser._id.toString(),
      email: savedUser.email,
      password: savedUser.password,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      phoneNumber: savedUser.phoneNumber,
      profiles: [],
      isActive: savedUser.isActive,
      subscriptionId: savedUser.subscriptionId,
      lastLogin: savedUser.lastLogin,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt
    };
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await User.findOne({ email });

    if (!user) return null;

    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      passwordHash: user.passwordHash,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  async findUserById(id: string): Promise<IUser | null> {
    const user = await User.findById(id);

    if (!user) return null;

    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      passwordHash: user.passwordHash,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<IUser | null> {
    const updateData: any = { ...data, updatedAt: new Date() };

    // If password is being updated, hash it
    if (data.password) {
      const saltRounds = 10;
      updateData.passwordHash = await hash(data.password);
      delete updateData.password;
    }

    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!user) return null;

    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      passwordHash: user.passwordHash,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
  // We can add refresh token collection to our repo if we want to support multiply refresh tokens for multi device for example 
  // // Refresh token methods 
  // async saveRefreshToken(userId: string, token: string, expiresAt: Date): Promise<void> {
  //   const refreshToken = new RefreshTokenModel({
  //     userId,
  //     token,
  //     expiresAt,
  //     createdAt: new Date()
  //   });

  //   await refreshToken.save();
  // }

  // async findRefreshToken(token: string): Promise<any | null> {
  //   return RefreshTokenModel.findOne({ token });
  // }

  // async revokeRefreshToken(token: string): Promise<boolean> {
  //   const result = await RefreshTokenModel.updateOne(
  //     { token },
  //     { isRevoked: true }
  //   );

  //   return result.modifiedCount > 0;
  // }

  // async revokeAllUserTokens(userId: string): Promise<boolean> {
  //   const result = await RefreshTokenModel.updateMany(
  //     { userId, isRevoked: false },
  //     { isRevoked: true }
  //   );

  //   return result.modifiedCount > 0;
  // }

  // async removeExpiredTokens(): Promise<number> {
  //   const result = await RefreshTokenModel.deleteMany({
  //     expiresAt: { $lt: new Date() }
  //   });

  //   return result.deletedCount;
  // }
}