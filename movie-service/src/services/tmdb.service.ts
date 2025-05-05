// src/services/tmdb.service.ts
import axios from 'axios';
import dotenv from 'dotenv';
import { injectable } from 'inversify';
import { MovieDetails, MovieResponse, Movie } from '../interfaces/IMovieable';
import { IGenre, GenreListResponse } from '../interfaces/IGenre';
import { MoviePreview } from '../interfaces/IMoviePreview';
import { 
  VideoResponse, 
  ContentRatingsResponse, 
  MovieReleaseDatesResponse,
  MultiSearchMovieResult,
  MultiSearchTvResult,
  MultiSearchResult 
} from '../interfaces/ITmbdResponse';
import { getOrSetCache } from '../utils/redis.cache';
import { handleApiRequest } from '../utils/sideFunctionLogic';
import fs from 'fs';
import ytdl from 'ytdl-core';
import ITmdbService from '../interfaces/ITmdbService';

dotenv.config();

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

@injectable()
export class TMDBService implements ITmdbService {
  private apiUrl: string;
  private apiKey: string;

  constructor() {
    if (!TMDB_API_KEY) {
      throw new Error('TMDB API key is missing');
    }

    this.apiUrl = TMDB_BASE_URL || 'https://api.themoviedb.org/3';
    this.apiKey = TMDB_API_KEY;
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    try {
      const response = await axios.get(`${this.apiUrl}${endpoint}`, {
        params: {
          api_key: this.apiKey,
          ...params
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('TMDB API error:', error.response?.data || error.message);
        throw new Error(`TMDB API error: ${error.message}`);
      }
      throw error;
    }
  }

  // Movie methods
  async getPopularMovies(page: number = 1): Promise<MovieResponse> {
    return await handleApiRequest<MovieResponse>(`popularMovies:${page}`, () => 
      this.makeRequest<MovieResponse>('/movie/popular', { page })
    );
  }

  async getTopRatedMovies(page: number = 1): Promise<MovieResponse> {
    return await handleApiRequest<MovieResponse>(`topRatedMovies:${page}`, () => 
      this.makeRequest<MovieResponse>('/movie/top_rated', { page })
    );
  }

  async getUpcomingMovies(page: number = 1): Promise<MovieResponse> {
    return await handleApiRequest<MovieResponse>(`upComingMovies:${page}`, () => 
      this.makeRequest<MovieResponse>('/movie/upcoming', { page })
    );
  }

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return await handleApiRequest<MovieDetails>(`movieIdDetail:${movieId}`, () => 
      this.makeRequest<MovieDetails>(`/movie/${movieId}`)
    );
  }

  async searchMovies(query: string, page: number = 1): Promise<MovieResponse> {
    return await handleApiRequest<MovieResponse>(`searchMovies:${query}:${page}`, () => 
      this.makeRequest<MovieResponse>('/search/movie', { query, page })
    );
  }

  async getSimilarMovies(movieId: number, page: number = 1): Promise<MovieResponse> {
    return await handleApiRequest<MovieResponse>(`similarMoviesById:${movieId}:${page}`, () => 
      this.makeRequest<MovieResponse>(`/movie/${movieId}/similar`, { page })
    );
  }

  // TV show methods
  async getPopularTvShows(page: number = 1): Promise<MovieResponse> {
    return await handleApiRequest<MovieResponse>(`popularTvShows:${page}`, () => 
      this.makeRequest<MovieResponse>('/tv/popular', { page })
    );
  }

  async getTopRatedTvShows(page: number = 1): Promise<MovieResponse> {
    return await handleApiRequest<MovieResponse>(`topRatedTvShows:${page}`, () => 
      this.makeRequest<MovieResponse>('/tv/top_rated', { page })
    );
  }

  async getTvShowDetails(tvId: number): Promise<any> {
    return await handleApiRequest<any>(`tvShowDetail:${tvId}`, () => 
      this.makeRequest<any>(`/tv/${tvId}`)
    );
  }

  // Genre methods
  async getMovieGenres(): Promise<GenreListResponse> {
    return await handleApiRequest<GenreListResponse>("movieGenres", () => 
      this.makeRequest<GenreListResponse>('/genre/movie/list')
    );
  }

  async getTvGenres(): Promise<GenreListResponse> {
    return await handleApiRequest<GenreListResponse>("tvGenres", () => 
      this.makeRequest<GenreListResponse>('/genre/tv/list')
    );
  }

  async getAllGenres(): Promise<GenreListResponse> {
    const [movieGenres, tvGenres] = await Promise.all([
      this.getMovieGenres(),
      this.getTvGenres()
    ]);
    
    const genres = [
      ...movieGenres.genres.map(genre => ({ ...genre, mediaType: 'movie' as const })),
      ...tvGenres.genres.map(genre => ({ ...genre, mediaType: 'tv' as const }))
    ];
    
    return { genres };
  }

  async getContentByGenre(genreId: number, mediaType: 'movie' | 'tv' = 'movie', page: number = 1): Promise<MovieResponse> {
    return await handleApiRequest<MovieResponse>(`${mediaType}ByGenre:${genreId}:${page}`, () => 
      this.makeRequest<MovieResponse>(`/discover/${mediaType}`, {
        with_genres: genreId,
        page
      })
    );
  }

  // Multi-search method
  async multiSearch(query: string, page: number = 1): Promise<{ results: MultiSearchResult[]; page: number; total_pages: number; total_results: number }> {
    return await handleApiRequest<{ results: MultiSearchResult[]; page: number; total_pages: number; total_results: number }>(`multiSearch:${query}:${page}`, () => 
      this.makeRequest<{ results: MultiSearchResult[]; page: number; total_pages: number; total_results: number }>('/search/multi', { query, page })
    );
  }

  // Methods for fetching additional data
  async getMovieVideos(movieId: number): Promise<VideoResponse> {
    return await handleApiRequest<VideoResponse>(`movieVideos:${movieId}`, () => 
      this.makeRequest<VideoResponse>(`/movie/${movieId}/videos`)
    );
  }

  async getTvVideos(tvId: number): Promise<VideoResponse> {
    return await handleApiRequest<VideoResponse>(`tvVideos:${tvId}`, () => 
      this.makeRequest<VideoResponse>(`/tv/${tvId}/videos`)
    );
  }

  async getMovieReleaseDates(movieId: number): Promise<MovieReleaseDatesResponse> {
    return await handleApiRequest<MovieReleaseDatesResponse>(`movieReleaseDates:${movieId}`, () => 
      this.makeRequest<MovieReleaseDatesResponse>(`/movie/${movieId}/release_dates`)
    );
  }

  async getTvContentRatings(tvId: number): Promise<ContentRatingsResponse> {
    return await handleApiRequest<ContentRatingsResponse>(`tvContentRatings:${tvId}`, () => 
      this.makeRequest<ContentRatingsResponse>(`/tv/${tvId}/content_ratings`)
    );
  }

  // Helper methods (private)
  private extractTrailerUrl(videos: VideoResponse): string | null {
    const trailer = videos.results.find(
      (video: { key: string; site: string; type: string }) => video.type === 'Trailer' && video.site === 'YouTube'
    );
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  }
  private extractAgeRestriction(certifications: MovieReleaseDatesResponse, countryCode: string = 'US'): string | null {
    const countryRelease = certifications.results.find(
      (result: { iso_3166_1: string; release_dates: Array<{ certification: string; type: number }> }) => 
        result.iso_3166_1 === countryCode
    );
    
    if (countryRelease && countryRelease.release_dates.length > 0) {
      const theatricalRelease = countryRelease.release_dates.find(
        (release: { certification: string; type: number }) => release.type === 3
      ) || countryRelease.release_dates[0];
      return theatricalRelease.certification || null;
    }
    
    return null;
  }

  private extractTvContentRating(contentRatings: ContentRatingsResponse, countryCode: string = 'US'): string | null {
    const countryRating = contentRatings.results.find(
      (rating: { iso_3166_1: string; rating: string }) => rating.iso_3166_1 === countryCode
    );
    return countryRating ? countryRating.rating : null;
  }

  private async getGenreNames(genreIds: number[], mediaType: 'movie' | 'tv'): Promise<string[]> {
    const genreList = mediaType === 'movie' 
      ? await this.getMovieGenres()
      : await this.getTvGenres();
    
    return genreIds
      .map(id => genreList.genres.find(genre => genre.id === id)?.name)
      .filter((name): name is string => name !== undefined);
  }

  // Transform methods
  async transformMovieToPreview(movie: Movie | MovieDetails): Promise<MoviePreview> {
    const [videos, releaseDates] = await Promise.all([
      this.getMovieVideos(movie.id),
      this.getMovieReleaseDates(movie.id)
    ]);

    const genreNames = 'genres' in movie && movie.genres
      ? movie.genres.map(genre => genre.name)
      : movie.genre_ids 
        ? await this.getGenreNames(movie.genre_ids, 'movie')
        : [];

    return {
      contentId: movie.id.toString(),
      title: movie.title,
      poster: this.getImageUrl(movie.poster_path),
      backdrop: this.getImageUrl(movie.backdrop_path),
      trailer: this.extractTrailerUrl(videos),
      genres: genreNames,
      ageRestriction: this.extractAgeRestriction(releaseDates),
      runtime: 'runtime' in movie ? movie.runtime : null,
      seasons: null,
      mediaType: 'movie'
    };
  }

  async transformMultiSearchMovieToPreview(movie: MultiSearchMovieResult): Promise<MoviePreview> {
    const [videos, releaseDates] = await Promise.all([
      this.getMovieVideos(movie.id),
      this.getMovieReleaseDates(movie.id)
    ]);

    const genreNames = movie.genre_ids 
      ? await this.getGenreNames(movie.genre_ids, 'movie')
      : [];

    // Fetch full movie details to get runtime
    const movieDetails = await this.getMovieDetails(movie.id);

    return {
      contentId: movie.id.toString(),
      title: movie.title,
      poster: this.getImageUrl(movie.poster_path),
      backdrop: this.getImageUrl(movie.backdrop_path),
      trailer: this.extractTrailerUrl(videos),
      genres: genreNames,
      ageRestriction: this.extractAgeRestriction(releaseDates),
      runtime: movieDetails.runtime || null,
      seasons: null,
      mediaType: 'movie'
    };
  }

  async transformTvShowToPreview(tvShow: any): Promise<MoviePreview> {
    const [videos, contentRatings] = await Promise.all([
      this.getTvVideos(tvShow.id),
      this.getTvContentRatings(tvShow.id)
    ]);

    const genreNames = tvShow.genres 
      ? tvShow.genres.map((genre: any) => genre.name)
      : tvShow.genre_ids 
        ? await this.getGenreNames(tvShow.genre_ids, 'tv')
        : [];

    return {
      contentId: tvShow.id.toString(),
      title: tvShow.name || tvShow.original_name,
      poster: this.getImageUrl(tvShow.poster_path),
      backdrop: this.getImageUrl(tvShow.backdrop_path),
      trailer: this.extractTrailerUrl(videos),
      genres: genreNames,
      ageRestriction: this.extractTvContentRating(contentRatings),
      runtime: tvShow.episode_run_time ? tvShow.episode_run_time[0] : null,
      seasons: tvShow.number_of_seasons || null,
      mediaType: 'tv'
    };
  }

  async transformMultiSearchTvToPreview(tvShow: MultiSearchTvResult): Promise<MoviePreview> {
    const [videos, contentRatings, tvDetails] = await Promise.all([
      this.getTvVideos(tvShow.id),
      this.getTvContentRatings(tvShow.id),
      this.getTvShowDetails(tvShow.id)
    ]);

    const genreNames = tvShow.genre_ids 
      ? await this.getGenreNames(tvShow.genre_ids, 'tv')
      : [];

    return {
      contentId: tvShow.id.toString(),
      title: tvShow.name,
      poster: this.getImageUrl(tvShow.poster_path),
      backdrop: this.getImageUrl(tvShow.backdrop_path),
      trailer: this.extractTrailerUrl(videos),
      genres: genreNames,
      ageRestriction: this.extractTvContentRating(contentRatings),
      runtime: tvDetails.episode_run_time ? tvDetails.episode_run_time[0] : null,
      seasons: tvDetails.number_of_seasons || null,
      mediaType: 'tv'
    };
  }

  // Utility methods
  async convertMovieToMp4(url: string) {
    ytdl(url, { filter: 'audioandvideo' })
      .pipe(fs.createWriteStream('public/videos/trailer.mp4'))
      .on('finish', () => {
        const file = fs.readFileSync('public/videos/trailer.mp4');
        return file;
      });
  }

  getImageUrl(path: string | null, size: string = 'w500'): string | null {
    if (!path) return null;
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
}