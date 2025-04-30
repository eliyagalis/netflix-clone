import { IProfilePreview } from "./IProfile";

export interface IUser {
    profiles: IProfilePreview[];
    status: UserStatus;
  }
  
  export enum UserStatus {
    INITIAL = 'initial',
    AWAITING_PAYMENT = 'awaiting_payment',
    ACTIVE = 'active',
    SUSPENDED = 'suspended',
    CANCELLED = 'cancelled',
    LOCKED = 'locked'
  }