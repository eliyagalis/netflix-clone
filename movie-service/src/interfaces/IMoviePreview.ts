export interface MoviePreview {
  contentId: string;
  title: string;
  poster: string | null;
  backdrop: string | null;
  trailer: string | null;
  genres: string[];
  ageRestriction: string | null;
  runtime: number | null; // For movies (in minutes)
  seasons: number | null; // For TV shows
  mediaType: 'movie' | 'tv';
}

export interface MoviePreviewResponse {
  page: number;
  results: MoviePreview[];
  total_pages: number;
  total_results: number;
}
