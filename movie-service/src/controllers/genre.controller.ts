// src/controllers/genre.controller.ts (new)
import { Request, Response } from 'express';
import { inject, injectable } from "inversify";
import { TOKENS } from '../tokens';
import ITmdbService from '../interfaces/ITmdbService';
import { handleError } from '../utils/handle-error-request';

@injectable()
export default class GenreController {
  constructor(@inject(TOKENS.ITmdbService) private tmdbService: ITmdbService) {}

  // Get all genres
  async getAllGenres(req: Request, res: Response): Promise<void> {
    try {
      const genres = await this.tmdbService.getAllGenres();
      res.json(genres);
    } catch (error) {
      handleError(res, error);
    }
  }

  // Get movie genres only
  async getMovieGenres(req: Request, res: Response): Promise<void> {
    try {
      const genres = await this.tmdbService.getMovieGenres();
      res.json(genres);
    } catch (error) {
      handleError(res, error);
    }
  }

  // Get TV show genres only
  async getTvGenres(req: Request, res: Response): Promise<void> {
    try {
      const genres = await this.tmdbService.getTvGenres();
      res.json(genres);
    } catch (error) {
      handleError(res, error);
    }
  }

  // Netflix-style: Get content by genre
  async getContentByGenre(req: Request, res: Response): Promise<void> {
    try {
      const genreId = Number(req.params.genreId);
      if (isNaN(genreId)) {
        res.status(400).json({ error: 'Invalid genre ID' });
        return;
      }

      // Default to 'movie' if no mediaType specified
      const mediaType = (req.query.mediaType as 'movie' | 'tv') || 'movie';
      const page = Number(req.query.page) || 1;
      
      const data = await this.tmdbService.getContentByGenre(genreId, mediaType, page);
      
      const results = data.results.map(item => ({
        ...item,
        poster_url: this.tmdbService.getImageUrl(item.poster_path),
        backdrop_url: this.tmdbService.getImageUrl(item.backdrop_path)
      }));

      res.json({
        page: data.page,
        results,
        total_pages: data.total_pages,
        total_results: data.total_results,
        genre_id: genreId,
        media_type: mediaType
      });
    } catch (error) {
      handleError(res, error);
    }
  }
}