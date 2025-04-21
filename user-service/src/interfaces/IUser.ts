import IProfile from "./IProfile";

export default interface IUser {
  id: string; // Optional for new users before saving
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  subscriptionId?: string;
  profiles?: IProfile[];
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
// Type guards to verify user state
export function isInitialUser(user: IUser): user is IUser & { id: string } {
  return user.status === UserStatus.INITIAL && user.id !== undefined;
}

export function isAwaitingPaymentUser(user: IUser): user is IUser & { id: string, password: string } {
  return user.status === UserStatus.AWAITING_PAYMENT && 
         user.id !== undefined && 
         user.password !== undefined;
}

export function isActiveUser(user: IUser): user is IUser & { id: string, password: string, subscriptionId: string } {
  return user.status === UserStatus.ACTIVE && 
         user.id !== undefined && 
         user.password !== undefined &&
         user.subscriptionId !== undefined;
}