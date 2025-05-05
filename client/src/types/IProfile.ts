import IMyListItem from "./IMyListItem";

export interface IProfilePreview {
    
    id: string;
    name: string;
    avatar: string;
}

export interface IProfile {
    id: string;
    name: string;
    avatar: string;
    isKid: boolean;
    myList: IMyListItem[];
}