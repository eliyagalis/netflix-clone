import {Types} from "mongoose";

export default interface IMongoMyListItem {
    _id?: Types.ObjectId;
    contentId: string;
    type: 'movie' | 'series';
    addedAt: Date;
    // priority: number; // For custom sorting
  }