// Interface for "My List" items
export default interface IMyListItem {
    contentId: string;
    title: string;
    poster: string | null;
    trailer: string | null;
    genres: string[];
    ageRestriction?: string;
    runtime?: number; // For movies - in minutes
    numberOfSeasons?: number; // For TV shows
    type: 'movie' | 'tv';
    addedAt: Date;
  }