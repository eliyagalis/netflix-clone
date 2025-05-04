import { Schema } from "mongoose";
import IMyListItem from "../interfaces/IMyListItem";

export const myListItemSchema = new Schema<IMyListItem>({
  contentId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    default: null
  },
  trailer: {
    type: String,
    default: null
  },
  genres: {
    type: [String],
    default: []
  },
  type: {
    type: String,
    enum: ['movie', 'tv'],
    required: true
  },
  ageRestriction: {
    type: String,
    required: false
  },
  runtime: {
    type: Number,
    required: false
  },
  numberOfSeasons: {
    type: Number,
    required: false
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
})
