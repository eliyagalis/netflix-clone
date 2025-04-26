import { Request, Response } from 'express';
import { handleError } from '../utils/handle-error-request';
import { inject, injectable } from "inversify";
import ITmdbService from '../interfaces/ITmdbService';
import { TOKENS } from '../tokens';

@injectable()
export default class MovieController {
  constructor(@inject(TOKENS.ITmdbService) private tmdbService:ITmdbService){}
  // Get popular movies
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
      handleError(res,error);
    }
  }

  // Get top rated movies
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
      handleError(res,error);
    }
  }

  // Get now playing movies
  // async getNowPlayingMovies(req: Request, res: Response): Promise<void> {
  //   try {
  //     const page = Number(req.query.page) || 1;
  //     const data = await this.tmdbService.getNowPlayingMovies(page);
      
  //     const movies = data.results.map(movie => ({
  //       ...movie,
  //       poster_url: this.tmdbService.getImageUrl(movie.poster_path),
  //       backdrop_url: this.tmdbService.getImageUrl(movie.backdrop_path)
  //     }));

  //     res.json({
  //       page: data.page,
  //       results: movies,
  //       total_pages: data.total_pages,
  //       total_results: data.total_results
  //     });
  //   } catch (error) {
  //     handleError(res,error);
  //   }
  // }

  // Get upcoming movies
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
      handleError(res,error);
    }
  }

  // Get movie details by ID
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
      handleError(res,error);
    }
  }

  // Search movies
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
      handleError(res,error);
    }
  }

  // Get movies by genre
  async getMoviesByGenre(req: Request, res: Response): Promise<void> {
    try {
      const genreId = Number(req.params.genreId);
      if (isNaN(genreId)) {
        res.status(400).json({ error: 'Invalid genre ID' });
        return;
      }

      const page = Number(req.query.page) || 1;
      const data = await this.tmdbService.getMoviesByGenre(genreId, page);
      
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
      handleError(res,error);
    }
  }

  // Get similar movies
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
      handleError(res,error);
    }
  }
}

