import { injectable } from 'inversify';
import mongoose, { Types } from 'mongoose';
import IUser from '../interfaces/IUser';
import IProfile from '../interfaces/IProfile';
import IMyListItem from '../interfaces/IMyListItem';
import IMongoUser from '../interfaces/IMongoUser';
import IMongoProfile from '../interfaces/IMongoProfile';
import IMongoMyListItem from '../interfaces/IMongoMyListItem'

@injectable()
export class UserAdapter {
  /**
   * Converts a domain user to a MongoDB user model
   */
  // public toMongoUser(user: IUser): IMongoUser {
  //   return {
  //     email: user.email,
  //     password: user.password,
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     createdAt: user.createdAt,
  //     updatedAt: user.updatedAt,
  //     isActive: user.isActive,
  //     subscriptionPlan: {
  //       ...user.subscriptionPlan
  //     },
  //     paymentMethod: {
  //       ...user.paymentMethod
  //     },
  //     profiles: user.profiles.map(item => this.toMongoProfile(item)),
  //     lastLogin: user.lastLogin
  //   };
  // }

  /**
   * Converts a MongoDB user model to a domain user
   */
  public toDomainUser(mongoUser: IMongoUser): IUser {
    return {
      id: mongoUser._id?.toString(),
      email: mongoUser.email,
      password: mongoUser.password,
      firstName: mongoUser.firstName,
      lastName: mongoUser.lastName,
      createdAt: mongoUser.createdAt,
      updatedAt: mongoUser.updatedAt,
      isActive: mongoUser.isActive,
    };
  }

  /**
   * Converts a domain profile to a MongoDB profile model
   */
  public toMongoProfile(profile: IProfile): IMongoProfile {
    return {
      _id: profile.id ? new mongoose.Types.ObjectId(profile.id) : undefined,
      userId: profile.userId ? new mongoose.Types.ObjectId(profile.userId) : undefined,
      bio: profile.bio,
      avatarUrl: profile.avatarUrl,
      location: profile.location,
      birthdate: profile.birthdate,
      interests: profile.interests,
      socialLinks: profile.socialLinks,
      myList: profile.myListItems ? 
        new mongoose.Types.DocumentArray(
          profile.myListItems.map(item => this.toMongoMyListItem(item))
        ) : 
        undefined,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }

  /**
   * Converts a MongoDB profile model to a domain profile
   */
  public toDomainProfile(mongoProfile: IMongoProfile): IProfile {
    return {
      id: mongoProfile._id.toString(),
      userId: mongoProfile.userId?.toString(),
      bio: mongoProfile.bio,
      avatarUrl: mongoProfile.avatarUrl,
      location: mongoProfile.location,
      birthdate: mongoProfile.birthdate,
      interests: mongoProfile.interests || [],
      socialLinks: mongoProfile.socialLinks || {},
      myListItems: mongoProfile.myList ? 
        Array.from(mongoProfile.myList).map(item => this.toDomainMyListItem(item)) : 
        [],
      createdAt: mongoProfile.createdAt,
      updatedAt: mongoProfile.updatedAt,
    };
  }

  /**
   * Converts a domain list item to a MongoDB list item model
   */
  public toMongoMyListItem(item: IMyListItem): Partial<IMongoMyListItem> {
    return {
      _id: item.id ? new mongoose.Types.ObjectId(item.id) : undefined,
      title: item.title,
      description: item.description,
      itemType: item.itemType,
      externalId: item.externalId,
      addedAt: item.addedAt,
      status: item.status,
      tags: item.tags,
      rating: item.rating,
      notes: item.notes,
    };
  }

  /**
   * Converts a MongoDB list item model to a domain list item
   */
  public toDomainMyListItem(mongoItem: IMongoMyListItem): IMyListItem {
    return {
      id: mongoItem._id.toString(),
      title: mongoItem.title,
      description: mongoItem.description,
      itemType: mongoItem.itemType,
      externalId: mongoItem.externalId,
      addedAt: mongoItem.addedAt,
    };
  }
}