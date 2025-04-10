import IMyListItem from "./IMyListItem";

export default interface IProfile {
    id?: string;
    name: string;
    avatar?: string;
    isKid: boolean;
    myList: IMyListItem[];
    // viewingHistory: {
    //   contentId: string;
    //   type: 'movie' | 'episode';
    //   watchedAt: Date;
    //   progress: number; // Percentage watched (0-100)
    //   completed: boolean;
    // }[];
    //add preference logic for recommendations
  }