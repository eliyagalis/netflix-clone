import { Request, Response } from 'express';
import tmdbService, { TMDBService } from '../services/tmdb.service';
import { handleError } from '../utils/handle-error-request';
import { inject, injectable } from "inversify";

@injectable()
export class MovieController {
  constructor(@inject(TMDBService))
  // Get popular movies
  async getPopularMovies(req: Request, res: Response): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const data = await tmdbService.getPopularMovies(page);
      
      const movies = data.results.map(movie => ({
        ...movie,
        poster_url: tmdbService.getImageUrl(movie.poster_path),
        backdrop_url: tmdbService.getImageUrl(movie.backdrop_path)
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
      const data = await tmdbService.getTopRatedMovies(page);
      
      const movies = data.results.map(movie => ({
        ...movie,
        poster_url: tmdbService.getImageUrl(movie.poster_path),
        backdrop_url: tmdbService.getImageUrl(movie.backdrop_path)
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
  //     const data = await tmdbService.getNowPlayingMovies(page);
      
  //     const movies = data.results.map(movie => ({
  //       ...movie,
  //       poster_url: tmdbService.getImageUrl(movie.poster_path),
  //       backdrop_url: tmdbService.getImageUrl(movie.backdrop_path)
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
      const data = await tmdbService.getUpcomingMovies(page);
      
      const movies = data.results.map(movie => ({
        ...movie,
        poster_url: tmdbService.getImageUrl(movie.poster_path),
        backdrop_url: tmdbService.getImageUrl(movie.backdrop_path)
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

      const movie = await tmdbService.getMovieDetails(movieId);
      
      res.json({
        ...movie,
        poster_url: tmdbService.getImageUrl(movie.poster_path),
        backdrop_url: tmdbService.getImageUrl(movie.backdrop_path)
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
      const data = await tmdbService.searchMovies(query, page);
      
      const movies = data.results.map(movie => ({
        ...movie,
        poster_url: tmdbService.getImageUrl(movie.poster_path),
        backdrop_url: tmdbService.getImageUrl(movie.backdrop_path)
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
      const data = await tmdbService.getMoviesByGenre(genreId, page);
      
      const movies = data.results.map(movie => ({
        ...movie,
        poster_url: tmdbService.getImageUrl(movie.poster_path),
        backdrop_url: tmdbService.getImageUrl(movie.backdrop_path)
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
      const data = await tmdbService.getSimilarMovies(movieId, page);
      
      const movies = data.results.map(movie => ({
        ...movie,
        poster_url: tmdbService.getImageUrl(movie.poster_path),
        backdrop_url: tmdbService.getImageUrl(movie.backdrop_path)
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

export default new MovieController();