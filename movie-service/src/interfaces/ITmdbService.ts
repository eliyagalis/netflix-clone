// src/interfaces/ITmdbService.ts
import { Movie, MovieDetails, MovieResponse } from './IMovieable';
import { GenreListResponse } from './IGenre';
import { MoviePreview } from './IMoviePreview';
import { ContentRatingsResponse, MovieReleaseDatesResponse, MultiSearchMovieResult, MultiSearchResult, MultiSearchTvResult, VideoResponse } from './ITmbdResponse';


export default interface ITmdbService {
  // Movie methods
  getPopularMovies(page?: number): Promise<MovieResponse>;
  getTopRatedMovies(page?: number): Promise<MovieResponse>;
  getUpcomingMovies(page?: number): Promise<MovieResponse>;
  getMovieDetails(movieId: number): Promise<MovieDetails>;
  searchMovies(query: string, page?: number): Promise<MovieResponse>;
  getSimilarMovies(movieId: number, page?: number): Promise<MovieResponse>;
  
  // TV show methods
  getPopularTvShows(page?: number): Promise<MovieResponse>;
  getTopRatedTvShows(page?: number): Promise<MovieResponse>;
  getTvShowDetails(tvId: number): Promise<any>;
  
  // Genre methods
  getMovieGenres(): Promise<GenreListResponse>;
  getTvGenres(): Promise<GenreListResponse>;
  getAllGenres(): Promise<GenreListResponse>;
  getContentByGenre(genreId: number, mediaType?: 'movie' | 'tv', page?: number): Promise<MovieResponse>;
  
  // Multi-search method
  multiSearch(query: string, page?: number): Promise<{ results: MultiSearchResult[]; page: number; total_pages: number; total_results: number }>;
  
  // Methods for fetching additional data
  getMovieVideos(movieId: number): Promise<VideoResponse>;
  getTvVideos(tvId: number): Promise<VideoResponse>;
  getMovieReleaseDates(movieId: number): Promise<MovieReleaseDatesResponse>;
  getTvContentRatings(tvId: number): Promise<ContentRatingsResponse>;
  
  // Transform methods
  transformMovieToPreview(movie: Movie | MovieDetails): Promise<MoviePreview>;
  transformTvShowToPreview(tvShow: any): Promise<MoviePreview>;
  transformMultiSearchMovieToPreview(movie: MultiSearchMovieResult): Promise<MoviePreview>;
  transformMultiSearchTvToPreview(tvShow: MultiSearchTvResult): Promise<MoviePreview>;
  
  // Utility methods
  getImageUrl(path: string | null, size?: string): string | null;
  convertMovieToMp4(url: string): any;
}