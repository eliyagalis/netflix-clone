import mongoose, { Schema } from "mongoose";
import IUser, { UserStatus } from "../interfaces/IUser";
import { profileSchema } from "./profile-mongo.model";


const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  subscriptionId: {
    type: String
  },
  profiles: [profileSchema],
  status: {
    type: String,
    enum: Object.values(UserStatus),
    default: UserStatus.INITIAL
  },
  lastLogin: {
    type: Date
  }
},
{
  timestamps: true
}
);
  
  // Hash password before saving
  userSchema.pre('save', async function(next) {
    // Add password hashing logic here similar to previous implementation
    next();
  });
  
const User = mongoose.model<IUser>('User', userSchema);
export default User;