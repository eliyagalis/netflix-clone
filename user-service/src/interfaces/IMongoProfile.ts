import IMongoMyListItem from "./IMongoMyListItem";
import {Types} from 'mongoose'

export default interface IMongoProfile extends Types.Subdocument {
    _id: Types.ObjectId;
    name: string;
    avatar: string;
    isKid: boolean;
    language: string;
    maturityLevel: 'kids' | 'teen' | 'adult';
    autoplayNextEpisode: boolean;
    autoplayPreviews: boolean;
    myList?: Types.DocumentArray<IMongoMyListItem>;
    viewingHistory: {
      contentId: string;
      type: 'movie' | 'episode';
      watchedAt: Date;
      progress: number; // Percentage watched (0-100)
      completed: boolean;
    }[];
    // preferences: {
    //   genre: string;
    //   weight: number; // Higher number = stronger preference
    // }[];
  }