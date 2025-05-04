// src/controllers/movie.controller.ts
import { Request, Response } from 'express';
import { handleError } from '../utils/handle-error-request';
import { inject, injectable } from "inversify";
import ITmdbService from '../interfaces/ITmdbService';
import { TOKENS } from '../tokens';
import { MoviePreview, MoviePreviewResponse } from '../interfaces/IMoviePreview';
import { MovieDetails, EnhancedMovieDetails } from '../interfaces/IMovieable';
import { VideoResponse, MovieReleaseDatesResponse } from '../interfaces//ITmbdResponse';

@injectable()
export default class MovieController {
  constructor(@inject(TOKENS.ITmdbService) private tmdbService: ITmdbService) {}

  // Movie collection endpoints - return MoviePreviewResponse
  async getPopularMovies(req: Request, res: Response): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const data = await this.tmdbService.getPopularMovies(page);
      
      const previews = await Promise.all(
        data.results.map(movie => this.tmdbService.transformMovieToPreview(movie))
      );

      const response: MoviePreviewResponse = {
        page: data.page,
        results: previews,
        total_pages: data.total_pages,
        total_results: data.total_results
      };

      res.json(response);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getTopRatedMovies(req: Request, res: Response): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const data = await this.tmdbService.getTopRatedMovies(page);
      
      const previews = await Promise.all(
        data.results.map(movie => this.tmdbService.transformMovieToPreview(movie))
      );

      const response: MoviePreviewResponse = {
        page: data.page,
        results: previews,
        total_pages: data.total_pages,
        total_results: data.total_results
      };

      res.json(response);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getUpcomingMovies(req: Request, res: Response): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const data = await this.tmdbService.getUpcomingMovies(page);
      
      const previews = await Promise.all(
        data.results.map(movie => this.tmdbService.transformMovieToPreview(movie))
      );

      const response: MoviePreviewResponse = {
        page: data.page,
        results: previews,
        total_pages: data.total_pages,
        total_results: data.total_results
      };

      res.json(response);
    } catch (error) {
      handleError(res, error);
    }
  }

  // Movie detail endpoint - return EnhancedMovieDetails
  async getMovieDetails(req: Request, res: Response): Promise<void> {
    try {
      const movieId = Number(req.params.id);
      if (isNaN(movieId)) {
        res.status(400).json({ error: 'Invalid movie ID' });
        return;
      }

      const movieDetails = await this.tmdbService.getMovieDetails(movieId);
      
      const [videos, releaseDates] = await Promise.all([
        this.tmdbService.getMovieVideos(movieId),
        this.tmdbService.getMovieReleaseDates(movieId)
      ]);

      const enhancedDetails: EnhancedMovieDetails = {
        ...movieDetails,
        poster_url: this.tmdbService.getImageUrl(movieDetails.poster_path),
        backdrop_url: this.tmdbService.getImageUrl(movieDetails.backdrop_path),
        trailer_url: this.extractTrailerUrl(videos),
        age_restriction: this.extractAgeRestriction(releaseDates)
      };
      
      res.json(enhancedDetails);
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
      
      const previews = await Promise.all(
        data.results.map(movie => this.tmdbService.transformMovieToPreview(movie))
      );

      const response: MoviePreviewResponse = {
        page: data.page,
        results: previews,
        total_pages: data.total_pages,
        total_results: data.total_results
      };

      res.json(response);
    } catch (error) {
      handleError(res, error);
    }
  }

  async searchMovies(req: Request, res: Response): Promise<void> {
    try {
      const query = req.query.query as string;
      if (!query) {
        res.status(400).json({ error: 'Search query is required' });
        return;
      }

      const page = Number(req.query.page) || 1;
      const data = await this.tmdbService.searchMovies(query, page);
      
      const previews = await Promise.all(
        data.results.map(movie => this.tmdbService.transformMovieToPreview(movie))
      );

      const response: MoviePreviewResponse = {
        page: data.page,
        results: previews,
        total_pages: data.total_pages,
        total_results: data.total_results
      };

      res.json(response);
    } catch (error) {
      handleError(res, error);
    }
  }

  async multiSearch(req: Request, res: Response): Promise<void> {
    try {
      const query = req.query.query as string;
      if (!query) {
        res.status(400).json({ error: 'Search query is required' });
        return;
      }

      const page = Number(req.query.page) || 1;
      const data = await this.tmdbService.multiSearch(query, page);
      
      const previewPromises = data.results
        .filter((item: any) => item.media_type === 'movie' || item.media_type === 'tv')
        .map(async (item: any) => {
          if (item.media_type === 'movie') {
            return this.tmdbService.transformMultiSearchMovieToPreview(item);
          } else if (item.media_type === 'tv') {
            return this.tmdbService.transformMultiSearchTvToPreview(item);
          }
          return undefined;
        });

      const previewResults = await Promise.all(previewPromises);
      const previews = previewResults.filter((preview): preview is MoviePreview => preview !== undefined);

      const response: MoviePreviewResponse = {
        page: data.page,
        results: previews,
        total_pages: data.total_pages,
        total_results: data.total_results
      };

      res.json(response);
    } catch (error) {
      handleError(res, error);
    }
  }

  // Helper methods
  private extractTrailerUrl(videos: VideoResponse): string | null {
    const trailer = videos.results.find(
      (video: { type: string; site: string }) => video.type === 'Trailer' && video.site === 'YouTube'
    );
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  }

  private extractAgeRestriction(certifications: MovieReleaseDatesResponse, countryCode: string = 'US'): string | null {
    const countryRelease = certifications.results.find(
      (result: { iso_3166_1: string }) => result.iso_3166_1 === countryCode
    );
    
    if (countryRelease && countryRelease.release_dates.length > 0) {
      const theatricalRelease = countryRelease.release_dates.find(
        (release: { type: number }) => release.type === 3
      ) || countryRelease.release_dates[0];
      return theatricalRelease.certification || null;
    }
    
    return null;
  }
}