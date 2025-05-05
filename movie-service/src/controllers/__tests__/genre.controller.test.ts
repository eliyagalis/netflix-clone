// src/controllers/__tests__/genre.controller.test.ts
import 'reflect-metadata';
import { Request, Response } from 'express';
import GenreController from '../genre.controller';
import ITmdbService from '../../interfaces/ITmdbService';
import { GenreListResponse } from '../../interfaces/IGenre';
import { MovieResponse } from '../../interfaces/IMovieable';

describe('GenreController', () => {
  let genreController: GenreController;
  let mockTmdbService: jest.Mocked<ITmdbService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockTmdbService = {
      getAllGenres: jest.fn(),
      getMovieGenres: jest.fn(),
      getTvGenres: jest.fn(),
      getContentByGenre: jest.fn(),
      getImageUrl: jest.fn(),
    } as any;

    genreController = new GenreController(mockTmdbService);

    mockRequest = {
      params: {},
      query: {},
    };

    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe('getAllGenres', () => {
    it('should return all genres', async () => {
      const mockGenres: GenreListResponse = {
        genres: [
          { id: 1, name: 'Action', mediaType: 'movie' },
          { id: 2, name: 'Drama', mediaType: 'tv' }
        ]
      };

      mockTmdbService.getAllGenres.mockResolvedValue(mockGenres);

      await genreController.getAllGenres(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockTmdbService.getAllGenres).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockGenres);
    });
  });

  describe('getMovieGenres', () => {
    it('should return movie genres only', async () => {
      const mockMovieGenres: GenreListResponse = {
        genres: [
          { id: 1, name: 'Action', mediaType: 'movie' },
          { id: 2, name: 'Comedy', mediaType: 'movie' }
        ]
      };

      mockTmdbService.getMovieGenres.mockResolvedValue(mockMovieGenres);

      await genreController.getMovieGenres(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockTmdbService.getMovieGenres).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockMovieGenres);
    });
  });

  describe('getTvGenres', () => {
    it('should return TV genres only', async () => {
      const mockTvGenres: GenreListResponse = {
        genres: [
          { id: 1, name: 'Drama', mediaType: 'tv' },
          { id: 2, name: 'Comedy', mediaType: 'tv' }
        ]
      };

      mockTmdbService.getTvGenres.mockResolvedValue(mockTvGenres);

      await genreController.getTvGenres(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockTmdbService.getTvGenres).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockTvGenres);
    });
  });

  describe('getContentByGenre', () => {
    it('should return content by genre', async () => {
      const mockContent: MovieResponse = {
        page: 1,
        results: [
          {
            id: 1,
            title: 'Test Movie',
            overview: 'Test overview',
            poster_path: '/test.jpg',
            backdrop_path: '/backdrop.jpg',
            release_date: '2024-01-01',
            vote_average: 8.5,
            vote_count: 100,
            genre_ids: [1]
          }
        ],
        total_pages: 1,
        total_results: 1
      };

      mockRequest.params = { genreId: '1' };
      mockRequest.query = { mediaType: 'movie', page: '1' };

      mockTmdbService.getContentByGenre.mockResolvedValue(mockContent);
      mockTmdbService.getImageUrl.mockImplementation((path) => 
        path ? `https://image.tmdb.org/t/p/w500${path}` : null
      );

      await genreController.getContentByGenre(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockTmdbService.getContentByGenre).toHaveBeenCalledWith(1, 'movie', 1);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          page: 1,
          total_pages: 1,
          total_results: 1,
          genre_id: 1,
          media_type: 'movie',
          results: expect.arrayContaining([
            expect.objectContaining({
              id: 1,
              title: 'Test Movie',
              poster_url: 'https://image.tmdb.org/t/p/w500/test.jpg',
              backdrop_url: 'https://image.tmdb.org/t/p/w500/backdrop.jpg'
            })
          ])
        })
      );
    });

    it('should return 400 for invalid genre ID', async () => {
      mockRequest.params = { genreId: 'invalid' };

      await genreController.getContentByGenre(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid genre ID' });
    });

    it('should use default mediaType "movie" if not specified', async () => {
      const mockContent: MovieResponse = {
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0
      };

      mockRequest.params = { genreId: '1' };
      mockRequest.query = {}; // No mediaType specified

      mockTmdbService.getContentByGenre.mockResolvedValue(mockContent);

      await genreController.getContentByGenre(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockTmdbService.getContentByGenre).toHaveBeenCalledWith(1, 'movie', 1);
    });
  });
});