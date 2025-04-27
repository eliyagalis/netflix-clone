export interface IUser {
    id: string; // Optional for new users before saving
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    subscriptionId?: string;
    profiles: any[]; // Array of profile objects
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