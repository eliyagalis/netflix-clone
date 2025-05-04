export interface VideoResponse {
    id: number;
    results: Array<{
      key: string;
      site: string;
      type: string;
    }>;
  }
  
  export interface ContentRatingsResponse {
    id: number;
    results: Array<{
      iso_3166_1: string;
      rating: string;
    }>;
  }
  
  export interface MovieReleaseDatesResponse {
    id: number;
    results: Array<{
      iso_3166_1: string;
      release_dates: Array<{
        certification: string;
        type: number;
      }>;
    }>;
  }
  
  export interface MultiSearchMovieResult {
    id: number;
    title: string;
    overview?: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date?: string;
    vote_average?: number;
    vote_count?: number;
    genre_ids?: number[];
    media_type: 'movie';
  }
  
  export interface MultiSearchTvResult {
    id: number;
    name: string;
    original_name?: string;
    overview?: string;
    poster_path: string | null;
    backdrop_path: string | null;
    first_air_date?: string;
    vote_average?: number;
    vote_count?: number;
    genre_ids?: number[];
    media_type: 'tv';
  }
  
  export type MultiSearchResult = MultiSearchMovieResult | MultiSearchTvResult | { media_type: string };