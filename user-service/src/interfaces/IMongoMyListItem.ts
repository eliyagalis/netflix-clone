import { Types } from "mongoose";

export default interface IMongoMyListItem {
  _id?: Types.ObjectId;
  contentId: string;
  title: string;
  poster: string | null;
  trailer: string | null;
  genres: string[];
  ageRestriction?: string;
  runtime?: number; // For movies - in minutes
  numberOfSeasons?: number; // For TV shows
  type: 'movie' | 'tv';
  addedAt: Date;
  // priority: number; // For custom sorting
}