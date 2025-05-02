// src/controllers/movie.controller.ts (updated)
import { Request, Response } from 'express';
import { handleError } from '../utils/handle-error-request';
import { inject, injectable } from "inversify";
import ITmdbService from '../interfaces/ITmdbService';
import { TOKENS } from '../tokens';

@injectable()
export default class MovieController {
  constructor(@inject(TOKENS.ITmdbService) private tmdbService: ITmdbService) {}

  // Movie collection endpoints
  async getPopularMovies(req: Request, res: Response): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const data = await this.tmdbService.getPopularMovies(page);
      
      const movies = data.results.map(movie => ({
        ...movie,
        poster_url: this.tmdbService.getImageUrl(movie.poster_path),
        backdrop_url: this.tmdbService.getImageUrl(movie.backdrop_path)
      }));

      res.json({
        page: data.page,
        results: movies,
        total_pages: data.total_pages,
        total_results: data.total_results
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getTopRatedMovies(req: Request, res: Response): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const data = await this.tmdbService.getTopRatedMovies(page);
      
      const movies = data.results.map(movie => ({
        ...movie,
        poster_url: this.tmdbService.getImageUrl(movie.poster_path),
        backdrop_url: this.tmdbService.getImageUrl(movie.backdrop_path)
      }));

      res.json({
        page: data.page,
        results: movies,
        total_pages: data.total_pages,
        total_results: data.total_results
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getUpcomingMovies(req: Request, res: Response): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const data = await this.tmdbService.getUpcomingMovies(page);
      
      const movies = data.results.map(movie => ({
        ...movie,
        poster_url: this.tmdbService.getImageUrl(movie.poster_path),
        backdrop_url: this.tmdbService.getImageUrl(movie.backdrop_path)
      }));

      res.json({
        page: data.page,
        results: movies,
        total_pages: data.total_pages,
        total_results: data.total_results
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  // Movie detail endpoints
  async getMovieDetails(req: Request, res: Response): Promise<void> {
    try {
      const movieId = Number(req.params.id);
      if (isNaN(movieId)) {
        res.status(400).json({ error: 'Invalid movie ID' });
        return;
      }

      const movie = await this.tmdbService.getMovieDetails(movieId);
      
      res.json({
        ...movie,
        poster_url: this.tmdbService.getImageUrl(movie.poster_path),
        backdrop_url: this.tmdbService.getImageUrl(movie.backdrop_path)
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getSimilarMovies(req: Request, res: Response): Promise<void> {
    try {
      const movieId = Number(req.params.id);
      if (isNaN(movieId)) {
        res.status(400).json({ error: 'Invalid movie ID' });
        return;
      }

      const page = Number(req.query.page) || 1;
      const data = await this.tmdbService.getSimilarMovies(movieId, page);
      
      const movies = data.results.map(movie => ({
        ...movie,
        poster_url: this.tmdbService.getImageUrl(movie.poster_path),
        backdrop_url: this.tmdbService.getImageUrl(movie.backdrop_path)
      }));

      res.json({
        page: data.page,
        results: movies,
        total_pages: data.total_pages,
        total_results: data.total_results
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  // Search endpoint
  async searchMovies(req: Request, res: Response): Promise<void> {
    try {
      const query = req.query.query as string;
      if (!query) {
        res.status(400).json({ error: 'Search query is required' });
        return;
      }

      const page = Number(req.query.page) || 1;
      const data = await this.tmdbService.searchMovies(query, page);
      
      const movies = data.results.map(movie => ({
        ...movie,
        poster_url: this.tmdbService.getImageUrl(movie.poster_path),
        backdrop_url: this.tmdbService.getImageUrl(movie.backdrop_path)
      }));

      res.json({
        page: data.page,
        results: movies,
        total_pages: data.total_pages,
        total_results: data.total_results
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  // Multi-search endpoint
  async multiSearch(req: Request, res: Response): Promise<void> {
    try {
      const query = req.query.query as string;
      if (!query) {
        res.status(400).json({ error: 'Search query is required' });
        return;
      }

      const page = Number(req.query.page) || 1;
      const data = await this.tmdbService.multiSearch(query, page);
      
      // Process results based on their media_type
      const processedResults = data.results.map((item: any) => {
        let processedItem = { ...item };
        
        // Add image URLs
        if (item.poster_path) {
          processedItem.poster_url = this.tmdbService.getImageUrl(item.poster_path);
        }
        if (item.backdrop_path) {
          processedItem.backdrop_url = this.tmdbService.getImageUrl(item.backdrop_path);
        }
        if (item.profile_path) {
          processedItem.profile_url = this.tmdbService.getImageUrl(item.profile_path);
        }
        
        return processedItem;
      });

      res.json({
        page: data.page,
        results: processedResults,
        total_pages: data.total_pages,
        total_results: data.total_results
      });
    } catch (error) {
      handleError(res, error);
    }
  }
}