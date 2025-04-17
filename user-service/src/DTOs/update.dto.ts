export default interface UpdateUserDTO {
    name?: string;
    password?: string;
    email?: string;
     
}

export interface addProfileDTO {
    name: string,
    avatar?: string,
    isKid?: boolean,
}

export interface addMyListItemDTO {
    contentId: string,
    type: 'movie' | 'series' ,
}