import { inject, injectable } from "inversify";
import SignupRequestDTO from "../DTOs/signup.dto";
import { IUser } from "../interfaces/IUser";
import IUserRepository from "../interfaces/IUserRepository";
import { User } from "../models/user-mongo.model";
import { UpdateUserDTO } from "../DTOs/update.dto";
import { TOKENS } from "../tokens";
import IUserAdapter from "../interfaces/IUserAdapter";
import mongoose from "mongoose";
import ITokenResponse from "../interfaces/ITokenResponse";

@injectable()
export class UserMongoRepository implements IUserRepository {
  constructor(@inject(TOKENS.IUserAdapter) private userAdapter: IUserAdapter) {}

  /**
   * Create a new user in the database
   */
  async create(data: SignupRequestDTO): Promise<ITokenResponse | null> {
    const userData = this.userAdapter.prepareForCreation(data);
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    return savedUser ? this.userAdapter.convertToStandardUser(savedUser) : null;
  }

  /**
   * Find a user by email address
   */
  async findByEmail(email: string): Promise<IUser | null> {
    const user = await User.findOne({ email: email.toLowerCase() });
    return user ? this.userAdapter.convertToStandardUser(user) : null;
  }

  /**
   * Find a user by ID
   */
  async findUserById(id: string): Promise<IUser | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    const user = await User.findById(id);
    return user ? this.userAdapter.convertToStandardUser(user) : null;
  }

  /**
   * Update user fields
   */
  async updateUser(id: string, data: UpdateUserDTO): Promise<IUser | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    const updateData = this.userAdapter.prepareForUpdate(data);
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    return updatedUser ? this.userAdapter.convertToStandardUser(updatedUser) : null;
  }

  /**
   * Update a specific field directly
   */
  async updateField(id: string, field: string, value: any): Promise<IUser | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    const update: any = {};
    update[field] = value;
    
    const updatedUser = await User.findByIdAndUpdate(id, { $set: update }, { new: true });
    return updatedUser ? this.userAdapter.convertToStandardUser(updatedUser) : null;
  }

  /**
   * Find a profile by ID within a user
   */
  async findProfile(userId: string, profileId: string): Promise<any | null> {
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(profileId)) {
      return null;
    }
    const user = await User.findById(userId);
    if (!user) return null;

    const profile = user.profiles.id(profileId);
    return profile ? this.userAdapter.convertProfile(profile) : null;
  }

  /**
   * Add an item to a profile's My List
   */
  async addToMyList(userId: string, profileId: string, item: any): Promise<boolean> {
    const dbItem = this.userAdapter.prepareMyListItem(item);
    const result = await User.updateOne(
      { 
        _id: userId,
        "profiles._id": profileId
      },
      { 
        $push: { "profiles.$.myList": dbItem } 
      }
    );
    
    return result.modifiedCount > 0;
  }

  /**
   * Remove an item from a profile's My List
   */
  async removeFromMyList(userId: string, profileId: string, contentId: string): Promise<boolean> {
    const result = await User.updateOne(
      { 
        _id: userId,
        "profiles._id": profileId
      },
      { 
        $pull: { "profiles.$.myList": { contentId } } 
      }
    );
    
    return result.modifiedCount > 0;
  }
}