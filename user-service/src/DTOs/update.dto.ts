export interface UpdateRequestDTO {
    name?: string;
    password?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
}

export interface AddProfileDTO {
    name: string,
    avatar?: string,
    isKid?: boolean,
}

export interface AddMyListItemDTO {
    contentId: string,
    type: 'movie' | 'series' ,
}