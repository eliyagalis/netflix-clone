import { inject, injectable } from "inversify";
import IUser, { UserStatus } from "../interfaces/IUser";
import IUserRepository from "../interfaces/IUserRepository";
import UpdateUserDTO, { addMyListItemDTO, addProfileDTO } from "../DTOs/update.dto";
import { TOKENS } from "../tokens";
import IUserAdapter from "../interfaces/IUserAdapter";
import User from "../models/user-mongo.model"
import { hash } from "../utils/bcrypt"
import { SetPasswordDTO, SetSubscriptionDTO, SetUserDTO,  } from "../DTOs/set.dto";
import IMyListItem from "../interfaces/IMyListItem";
import { Types } from "mongoose";

@injectable()
export class UserMongoRepository implements IUserRepository {

  constructor(
    @inject(TOKENS.IUserAdapter) private userAdapter: IUserAdapter,
   )
  {}

  async addInitialUser(data: SetUserDTO): Promise<IUser> {
    const newInitialUser = new User({
      email: data.email,
      status: UserStatus.PENDING
    });

    return this.userAdapter.toDomainUser(await newInitialUser.save());
  }

  async addUserPassword(userId: string, data: SetPasswordDTO): Promise <IUser | null> {
    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      {
        password: data.password,
        status: UserStatus.AWAITING_PAYMENT
      },
      {new: true}
    );
    if (!updatedUser) return null;
    return this.userAdapter.toDomainUser(updatedUser);
  }

  async addSubscriptionId(userId: string, data: SetSubscriptionDTO): Promise <IUser | null> {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        subscriptionId: data.subscriptionId,
        status: UserStatus.ACTIVE
      },
      { new: true}
    );
    if (!updatedUser) return null;
    return this.userAdapter.toDomainUser(updatedUser);
  }

  async addProfile(userId: string, profileDTO: addProfileDTO): Promise<IUser | null> {
    const profile = {
      name: profileDTO.name,
      avatar: profileDTO.avatar || 'default-avatar.png',
      isKid: profileDTO.isKid || false,
      myList: []
    };
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        $push: { profiles: profile },
      },
      { new: true}
    );
    
    if (!updatedUser) return null;
    return this.userAdapter.toDomainUser(updatedUser);
  }

  async addMyListItem(userId: string, profileId: string, itemDTO: addMyListItemDTO): Promise<boolean> {
    const myListItem : IMyListItem = {
      contentId: itemDTO.contentId,
      type: itemDTO.type,
      addedAt: new Date()
    };

    const result = await User.updateOne(
      {
        _id: new Types.ObjectId(userId),
        'profiles._id': new Types.ObjectId(profileId) 
      },
      { $push: {'profiles.$.myList': myListItem} }
    );

    return result.modifiedCount > 0;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await User.findOne({ email });

    if (!user) return null;

    return this.userAdapter.toDomainUser(user);
  }

  async findUserById(id: string): Promise<IUser | null> {
    const user = await User.findById(id);

    if (!user) return null;

    return this.userAdapter.toDomainUser(user)
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<IUser | null> {
    const updateData = { ...data, updatedAt: new Date() };

    // If password is being updated, hash it
    if (data.password) {
      updateData.password = await hash(data.password);
    }

    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!user) return null;

    return this.userAdapter.toDomainUser(user);
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