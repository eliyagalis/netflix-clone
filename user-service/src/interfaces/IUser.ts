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
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}
