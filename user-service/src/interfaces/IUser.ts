import IProfile from "./IProfile";

export default interface IUser {
  id?: string; // Optional for new users before saving
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  subscriptionId?: string;
  profiles: IProfile[];
  status: UserStatus;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserStatus {
  PENDING = 'pending',
  INCOMPLETE = 'incomplete',
  AWAITING_PAYMENT = 'awaiting_payment',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  CANCELLED = 'cancelled',
  LOCKED = 'locked'
}