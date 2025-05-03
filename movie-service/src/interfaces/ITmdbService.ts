import { IGenre, GenreListResponse } from "./IGenre";
import { MovieDetails, MovieResponse } from "./IMovieable";

export default interface ITmdbService {
  // Movie methods
  getPopularMovies(page?: number): Promise<MovieResponse>;
  getTopRatedMovies(page?: number): Promise<MovieResponse>;
  getUpcomingMovies(page?: number): Promise<MovieResponse>;
  getMovieDetails(movieId: number): Promise<MovieDetails>;
  searchMovies(query: string, page?: number): Promise<MovieResponse>;
  getSimilarMovies(movieId: number, page?: number): Promise<MovieResponse>;
  
  // TV Show methods
  getPopularTvShows(page?: number): Promise<MovieResponse>;
  getTopRatedTvShows(page?: number): Promise<MovieResponse>;
  getTvShowDetails(tvId: number): Promise<MovieDetails>;
  
  // Genre methods
  getMovieGenres(): Promise<GenreListResponse>;
  getTvGenres(): Promise<GenreListResponse>;
  getAllGenres(): Promise<GenreListResponse>;
  getContentByGenre(genreId: number, mediaType?: 'movie' | 'tv', page?: number): Promise<MovieResponse>;
  
  // Search methods
  multiSearch(query: string, page?: number): Promise<any>;
  
  // Utility methods
  getImageUrl(path: string | null, size?: string): string | null;
  convertMovieToMp4(url: string): Promise<any>;
}