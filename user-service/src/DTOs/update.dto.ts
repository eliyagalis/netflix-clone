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
    contentId: string;
    title: string;
    poster: string | null;
    trailer: string | null;
    genres: string[];
    ageRestriction?: string;
    runtime?: number; // For movies - in minutes
    numberOfSeasons?: number; // For TV shows
    type: 'movie' | 'tv';
}