export interface IUser {
    id: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    subscriptionId?: string;
    profiles: any[];
    status: UserStatus;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export enum UserStatus {
    INITIAL = 'initial',
    AWAITING_PAYMENT = 'awaiting_payment',
    ACTIVE = 'active',
    SUSPENDED = 'suspended',
    CANCELLED = 'cancelled',
    LOCKED = 'locked'
  }