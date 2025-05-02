// src/services/tmdb.service.ts (updated)
import axios from 'axios';
import dotenv from 'dotenv';
import { injectable } from 'inversify';
import { MovieDetails, MovieResponse } from '../interfaces/IMovieable';
import { GenreListResponse } from '../interfaces/IGenre';
import ITmdbService from '../interfaces/ITmdbService';
import { handleApiRequest } from '../utils/sideFunctionLogic';
import fs from 'fs';
import ytdl from 'ytdl-core';

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
    return await handleApiRequest<MovieResponse>("popularMovies", () => 
      this.makeRequest<MovieResponse>('/movie/popular', { page })
    );
  }

  async getTopRatedMovies(page: number = 1): Promise<MovieResponse> {
    return await handleApiRequest<MovieResponse>("topRatedMovies", () => 
      this.makeRequest<MovieResponse>('/movie/top_rated', { page })
    );
  }

  async getUpcomingMovies(page: number = 1): Promise<MovieResponse> {
    return await handleApiRequest<MovieResponse>("upComingMovies", () => 
      this.makeRequest<MovieResponse>('/movie/upcoming', { page })
    );
  }

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return await handleApiRequest<MovieDetails>(`movieIdDetail:${movieId}`, () => 
      this.makeRequest<MovieDetails>(`/movie/${movieId}`)
    );
  }

  async searchMovies(query: string, page: number = 1): Promise<MovieResponse> {
    return await handleApiRequest<MovieResponse>(`searchMovies:${query}`, () => 
      this.makeRequest<MovieResponse>('/search/movie', { query, page })
    );
  }

  async getSimilarMovies(movieId: number, page: number = 1): Promise<MovieResponse> {
    return await handleApiRequest<MovieResponse>(`similarMoviesById:${movieId}`, () => 
      this.makeRequest<MovieResponse>(`/movie/${movieId}/similar`, { page })
    );
  }

  // TV methods
  async getPopularTvShows(page: number = 1): Promise<MovieResponse> {
    return await handleApiRequest<MovieResponse>("popularTvShows", () => 
      this.makeRequest<MovieResponse>('/tv/popular', { page })
    );
  }

  async getTopRatedTvShows(page: number = 1): Promise<MovieResponse> {
    return await handleApiRequest<MovieResponse>("topRatedTvShows", () => 
      this.makeRequest<MovieResponse>('/tv/top_rated', { page })
    );
  }

  async getTvShowDetails(tvId: number): Promise<MovieDetails> {
    return await handleApiRequest<MovieDetails>(`tvShowDetail:${tvId}`, () => 
      this.makeRequest<MovieDetails>(`/tv/${tvId}`)
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
    return await handleApiRequest<MovieResponse>(`${mediaType}ByGenre:${genreId}`, () => 
      this.makeRequest<MovieResponse>(`/discover/${mediaType}`, {
        with_genres: genreId,
        page
      })
    );
  }

  // Search methods
  async multiSearch(query: string, page: number = 1): Promise<any> {
    return await handleApiRequest<any>(`multiSearch:${query}`, () => 
      this.makeRequest<any>('/search/multi', { query, page })
    );
  }

  // Utility methods
  async convertMovieToMp4(url: string) {
    return new Promise((resolve, reject) => {
      ytdl(url, { filter: 'audioandvideo' })
        .pipe(fs.createWriteStream('public/videos/trailer.mp4'))
        .on('finish', () => {
          try {
            const file = fs.readFileSync('public/videos/trailer.mp4');
            resolve(file);
          } catch (err) {
            reject(err);
          }
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  getImageUrl(path: string | null, size: string = 'w500'): string | null {
    if (!path) return null;
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
}