import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";
import { profileSchema } from "./profile-mongo.model";


const userSchema = new Schema<IUser>(
    {
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
        required: true,
        trim: true
      },
      lastName: {
        type: String,
        required: true,
        trim: true
      },
      phoneNumber: {
        type: String,
        trim: true
      },
      subscriptionPlan: {
        planId: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        quality: {
          type: String,
          required: true
        },
        maxProfiles: {
          type: Number,
          required: true,
          default: 5
        },
        startDate: {
          type: Date,
          default: Date.now
        },
        nextBillingDate: {
          type: Date,
          required: true
        },
        status: {
          type: String,
          enum: ['active', 'canceled', 'paused'],
          default: 'active'
        }
      },
      paymentMethod: {
        type: {
          type: String,
          required: true,
          enum: ['credit_card', 'paypal', 'gift_card']
        },
        lastFour: String,
        expiryDate: String,
        billingAddress: {
          street: String,
          city: String,
          state: String,
          zipCode: String,
          country: String
        }
      },
      profiles: [profileSchema],
      isActive: {
        type: Boolean,
        default: true
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
  
  export const User = mongoose.model<IUser>('User', userSchema);