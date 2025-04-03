import { Schema } from "mongoose";
import { IMyListItem } from "../interfaces/IMyListItem";

export const myListItemSchema = new Schema<IMyListItem>({
    contentId: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['movie', 'series'],
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    },
    priority: {
      type: Number,
      default: 0
    }
  });