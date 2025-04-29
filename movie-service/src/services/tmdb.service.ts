import axios from 'axios';
import dotenv from 'dotenv';
import { injectable } from 'inversify';
import { MovieDetails, MovieResponse } from '../interfaces/IMovieable';
import { getOrSetCache } from '../utils/redis.cache';
import { handleApiRequest } from '../utils/sideFunctionLogic';
import fs from 'fs';
import ytdl from 'ytdl-core';

dotenv.config();

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;


@injectable()
export class TMDBService {

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

  async getPopularMovies(page: number = 1): Promise<MovieResponse> {
    return await handleApiRequest<MovieResponse>("popularMovies",()=>this.makeRequest<MovieResponse>('/movie/popular', { page }));
    
  }

  async getTopRatedMovies(page: number = 1): Promise<MovieResponse> {
    return await handleApiRequest<MovieResponse>("topRatedMovies",()=>this.makeRequest<MovieResponse>('/movie/top_rated', { page }));
  }

  // async getNowPlayingMovies(page: number = 1): Promise<MovieResponse> {
  //   return this.makeRequest<MovieResponse>('/movie/now_playing', { page });
  // }

  async getUpcomingMovies(page: number = 1): Promise<MovieResponse> {
    return await handleApiRequest<MovieResponse>("upComingMovies",()=>this.makeRequest<MovieResponse>('/movie/upcoming', { page }));
  
  }
 
  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return await handleApiRequest<MovieDetails>(`movieIdDetail:${movieId}`,()=>this.makeRequest<MovieDetails>(`/movie/${movieId}`));
  }

  async searchMovies(query: string, page: number = 1): Promise<MovieResponse> {
    return await handleApiRequest<MovieResponse>(`searchMovies: ${query}`,()=>this.makeRequest<MovieResponse>('/search/movie', { query, page }));
  }

  async getMoviesByGenre(genreId: number, page: number = 1): Promise<MovieResponse> {
    return await handleApiRequest<MovieResponse>(`moviesByGenre: ${genreId}`,()=>{this.makeRequest<MovieResponse>('/discover/movie', { 
      with_genres: genreId,
      page
    })});

    // return this.makeRequest<MovieResponse>('/discover/movie', { 
    //   with_genres: genreId,
    //   page
    // });
  }

  async getSimilarMovies(movieId: number, page: number = 1): Promise<MovieResponse> {
    return await handleApiRequest<MovieResponse>(`similarMoviesById: ${movieId}`,()=>this.makeRequest<MovieResponse>(`/movie/${movieId}/similar`, { page }))
  }

  getImageUrl(path: string | null, size: string = 'w500'): string | null {
    if (!path) return null;
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
}

