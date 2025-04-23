export default interface UpdateRequestDTO {
    name?: string;
    password?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
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