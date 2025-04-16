import {Types, Document } from 'mongoose';
import IMongoProfile from './IMongoProfile';
import { UserStatus } from './IUser';

export default interface IMongoUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  subscriptionPlan: {
    planId: string;
  };
  profiles: Types.DocumentArray<IMongoProfile>;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}