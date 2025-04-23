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
import SignupRequestDTO from "../DTOs/signup.dto";
import IStatusService from "../interfaces/IStatusService";
import IProfile from "../interfaces/IProfile";

@injectable()
export class UserMongoRepository implements IUserRepository {

  constructor(
    @inject(TOKENS.IUserAdapter) private userAdapter: IUserAdapter,
    @inject(TOKENS.IStatusService) private statusService: IStatusService
   )
  {}
  async addInitialUser(data: SignupRequestDTO): Promise<IUser | null> {
    const newInitialUser = new User(data);
    return newInitialUser ? this.userAdapter.toDomainUser(await newInitialUser.save()): null;
  }
  
  async addSubscriptionId(userId: string, data: SetSubscriptionDTO): Promise<IUser | null> {
    const user = await User.findById(userId);
    if (!user) return null;

    const nextStatus = this.statusService.getStatusAfterSubscription(user.status);
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        subscriptionId: data.subscriptionId,
        status: nextStatus
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
  
  async getProfiles(userId: string): Promise<IProfile[] | null> {
    const user = await User.findById(userId)

    if (!user)
      return null;

    return user.profiles;
  }
}