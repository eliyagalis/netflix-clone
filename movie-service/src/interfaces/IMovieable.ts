export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  status: string;
  tagline: string | null;
  budget: number;
  revenue: number;
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
  }[];
}

export interface MovieResponse {
  page: number;
  results: Movie[];  // Use Movie[] here, not MoviePreview[]
  total_pages: number;
  total_results: number;
}

export interface EnhancedMovieDetails extends MovieDetails {
  poster_url: string | null;
  backdrop_url: string | null;
  trailer_url: string | null;
  age_restriction: string | null;
}