// Interface for "My List" items
export default interface IMyListItem {
  id: number;
  contentId: string;
  title: string;
  poster: string | null;
  backdrop: string | null;
  trailer: string | null;
  genres: { id: number; name: string }[];
  ageRestriction: string | null;
  runtime: number | null; // For movies (in minutes)
  seasons: number | null; // For TV shows
  mediaType: 'movie' | 'tv';
}

export interface IMovieDetails extends IMyListItem {
poster_url: string | null;
backdrop_url: string | null;
trailer_url: string | null;
age_restriction: string | null;
overview: string;
}