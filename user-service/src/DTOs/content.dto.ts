export interface IContentDTO {
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
  