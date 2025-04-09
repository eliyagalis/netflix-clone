import { Schema } from "mongoose";
import IProfile from "../interfaces/IProfile";
import { myListItemSchema } from "./myList-mongo.model";

export const profileSchema = new Schema<IProfile>({
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25
    },
    avatar: {
      type: String,
      default: 'default-avatar.png'
    },
    isKid: {
      type: Boolean,
      default: false
    },
    language: {
      type: String,
      default: 'en'
    },
    maturityLevel: {
      type: String,
      enum: ['kids', 'teen', 'adult'],
      default: 'adult'
    },
    autoplayNextEpisode: {
      type: Boolean,
      default: true
    },
    autoplayPreviews: {
      type: Boolean,
      default: true
    },
    myList: [myListItemSchema],
    viewingHistory: [
      {
        contentId: {
          type: String,
          required: true
        },
        type: {
          type: String,
          enum: ['movie', 'episode'],
          required: true
        },
        watchedAt: {
          type: Date,
          default: Date.now
        },
        progress: {
          type: Number,
          min: 0,
          max: 100,
          default: 0
        },
        completed: {
          type: Boolean,
          default: false
        }
      }
    ]
    //,
    // preferences: [
    //   {
    //     genre: {
    //       type: String,
    //       required: true
    //     },
    //     weight: {
    //       type: Number,
    //       default: 1,
    //       min: 0,
    //       max: 10
    //     }
    //   }
    // ]
  });