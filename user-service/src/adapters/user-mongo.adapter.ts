import { injectable } from 'inversify';
import { Types } from 'mongoose';
import IUser, { UserStatus } from '../interfaces/IUser';
import IProfile from '../interfaces/IProfile';
import IMyListItem from '../interfaces/IMyListItem';
import IMongoUser from '../interfaces/IMongoUser';

import IUserAdapter from '../interfaces/IUserAdapter';
import IMongoProfile from '../interfaces/IMongoProfile';
import IMongoMyListItem from '../interfaces/IMongoMyListItem';

@injectable()
export default class MongoUserAdapter implements IUserAdapter {
  /**
   * Converts a MongoDB user model to a domain user
   */
  public toDomainUser(mongoUser: IMongoUser): IUser {

    return {
      id: mongoUser._id.toString(),
      email: mongoUser.email,
      password: mongoUser.password,
      firstName: mongoUser.firstName,
      lastName: mongoUser.lastName,
      phoneNumber: mongoUser.phoneNumber,
      profiles: mongoUser.profiles?.map(profile => this.toDomainProfile(profile)) || [],
      status: mongoUser.status as UserStatus,
      subscriptionId: mongoUser.subscriptionId,
      lastLogin: mongoUser.lastLogin,
      createdAt: mongoUser.createdAt,
      updatedAt: mongoUser.updatedAt
    };
  }

  /**
   * Converts a domain user model to a MongoDB user model
   */
  public toDbUser(user: Partial<IUser>): Partial<IMongoUser> {
    const result: Partial<IMongoUser> = {};

    if (user.id) result._id = new Types.ObjectId(user.id);
    if (user.email !== undefined) result.email = user.email;
    if (user.password !== undefined) result.password = user.password;
    if (user.firstName !== undefined) result.firstName = user.firstName;
    if (user.lastName !== undefined) result.lastName = user.lastName;
    if (user.phoneNumber !== undefined) result.phoneNumber = user.phoneNumber;
    if (user.subscriptionId !== undefined) result.subscriptionId = user.subscriptionId;
    if (user.status !== undefined) result.status = user.status;
    if (user.lastLogin !== undefined) result.lastLogin = user.lastLogin;

    if (user.profiles) {
      result.profiles = user.profiles.map(profile => this.toDbProfile(profile)) as IMongoProfile[];
    }
    return result;
  }

  /**
   * Converts a MongoDB profile model to a domain profile
   */
  private toDomainProfile(mongoProfile: IMongoProfile): IProfile {
    return {
      id: mongoProfile._id?.toString(),
      name: mongoProfile.name,
      avatar: mongoProfile.avatar,
      isKid: mongoProfile.isKid,
      myList: mongoProfile.myList?.map(listItem => this.toDomainMyListItem(listItem)) || []
    };
  }

  /**
   * Converts a domain profile model to a MongoDB profile model
   */
  public toDbProfile(profile: Partial<IProfile>): Partial<IMongoProfile> {
    const result: Partial<IMongoProfile> = {};
    if (profile.id) result._id = new Types.ObjectId(profile.id);
    if (profile.name !== undefined) result.name = profile.name;
    if (profile.avatar !== undefined) result.avatar = profile.avatar;
    if (profile.isKid !== undefined) result.isKid = profile.isKid;

    if (profile.myList) {
      result.myList = profile.myList.map(item => this.toDbMyListItem(item)) as IMongoMyListItem[];
    }
    return result;
  }
  /**
   * Converts a domain list item to a MongoDB list item model
   */
  private toDomainMyListItem(mongoListItem: IMongoMyListItem): IMyListItem {
    return {
      id: mongoListItem._id.toString(),
      contentId: mongoListItem.contentId,
      type: mongoListItem.type,
      addedAt: mongoListItem.addedAt
    };
  }

  /**
   * Converts a domain list item to a MongoDB list item model
   */
  public toDbMyListItem(myListItem: Partial<IMyListItem>): Partial<IMongoMyListItem> {
    const result: Partial<IMongoMyListItem> = {};

    if (myListItem.id) result._id = new Types.ObjectId(myListItem.id);
    if (myListItem.contentId !== undefined) result.contentId = myListItem.contentId;
    if (myListItem.type !== undefined) result.type = myListItem.type;
    if (myListItem.addedAt !== undefined) result.addedAt = myListItem.addedAt;

    return result;
  }

}