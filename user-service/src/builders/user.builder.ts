import IProfile from "../interfaces/IProfile";
import IUser, { UserStatus } from "../interfaces/IUser";
import IUserBuilder from "../interfaces/IUserBuilder";

  
export default class UserBuilder implements IUserBuilder{
    private user: Partial<IUser> = {
      status: UserStatus.PENDING,
      profiles: []
    };
  
    withEmailAndPassword(email: string, password: string): UserBuilder {
      this.user.email = email.toLowerCase().trim();
      this.user.password = password; // Note: Would be hashed before saving
      return this;
    }
  
    withPersonalInformation(firstName: string, lastName: string, phoneNumber?: string): UserBuilder {
      this.user.firstName = firstName;
      this.user.lastName = lastName;
      if (phoneNumber) {
        this.user.phoneNumber = phoneNumber;
      }
      this.user.status = UserStatus.INCOMPLETE;
      return this;
    }
  
    withSubscription(subscriptionId: string): UserBuilder {
      this.user.subscriptionId = subscriptionId;
      this.user.status = UserStatus.AWAITING_PAYMENT;
      return this;
    }
  
    withProfile(profile: IProfile): UserBuilder {
      this.user.profiles = [profile];
      return this;
    }
  
    withStatus(status: UserStatus): UserBuilder {
      this.user.status = status;
      return this;
    }
  
    activate(): UserBuilder {
      this.user.status = UserStatus.ACTIVE;
      return this;
    }
  
    build(): Partial<IUser> {
      return { ...this.user };
    }
  }