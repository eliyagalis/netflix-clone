import IMongoMyListItem from "./IMongoMyListItem";
import {Types} from 'mongoose'

export default interface IMongoProfile {
    _id: Types.ObjectId;
    name: string;
    avatar: string;
    isKid: boolean;
    myList: IMongoMyListItem[];
    // viewingHistory: {
    //   contentId: string;
    //   type: 'movie' | 'episode';
    //   watchedAt: Date;
    //   progress: number; // Percentage watched (0-100)
    //   completed: boolean;
    // }[];
    // preferences: {
    //   genre: string;
    //   weight: number; // Higher number = stronger preference
    // }[];
  }