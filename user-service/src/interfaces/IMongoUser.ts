import {Types, Document } from 'mongoose';
import IMongoProfile from './IMongoProfile';

export default interface IMongoUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  subscriptionPlan: {
    planId: string;
    name: string;
    price: number;
    quality: string;
    maxProfiles: number;
    startDate: Date;
    nextBillingDate: Date;
    status: string; // 'active' | 'canceled' | 'paused'
  };
  paymentMethod: {
    type: string;
    lastFour?: string;
    expiryDate?: string;
    billingAddress?: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  profiles: Types.DocumentArray<IMongoProfile>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}