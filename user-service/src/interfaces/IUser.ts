import IProfile from "./IProfile";

export default interface IUser {
    id?: string;
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
      status: 'active' | 'canceled' | 'paused';
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
    profiles: IProfile[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    lastLogin?: Date;
  }
