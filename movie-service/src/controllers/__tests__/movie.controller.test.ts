// src/controllers/__tests__/movie.controller.test.ts
import 'reflect-metadata';
import { Request, Response } from 'express';
import MovieController from '../movie.controller';
import ITmdbService from '../../interfaces/ITmdbService';
import { MovieResponse } from '../../interfaces/IMovieable';
import { MoviePreview, MoviePreviewResponse } from '../../interfaces/IMoviePreview';

describe('MovieController', () => {
  let movieController: MovieController;
  let mockTmdbService: jest.Mocked<ITmdbService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockTmdbService = {
      getPopularMovies: jest.fn(),
      getTopRatedMovies: jest.fn(),
      getUpcomingMovies: jest.fn(),
      getMovieDetails: jest.fn(),
      searchMovies: jest.fn(),
      getSimilarMovies: jest.fn(),
      multiSearch: jest.fn(),
      transformMovieToPreview: jest.fn(),
      getMovieVideos: jest.fn(),
      getMovieReleaseDates: jest.fn(),
      transformMultiSearchMovieToPreview: jest.fn(),
      transformMultiSearchTvToPreview: jest.fn(),
      getImageUrl: jest.fn(),
    } as any;

    movieController = new MovieController(mockTmdbService);

    mockRequest = {
      params: {},
      query: {},
    };

    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe('getPopularMovies', () => {
    it('should return popular movies with preview format', async () => {
      const mockMovieResponse: MovieResponse = {
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
            genre_ids: [1, 2]
          }
        ],
        total_pages: 10,
        total_results: 200
      };

      const mockPreview: MoviePreview = {
        contentId: '1',
        title: 'Test Movie',
        poster: 'https://test.jpg',
        backdrop: 'https://backdrop.jpg',
        trailer: 'https://youtube.com/trailer',
        genres: ['Action', 'Comedy'],
        ageRestriction: 'PG-13',
        runtime: 120,
        seasons: null,
        mediaType: 'movie'
      };

      mockRequest.query = { page: '2' };
      mockTmdbService.getPopularMovies.mockResolvedValue(mockMovieResponse);
      mockTmdbService.transformMovieToPreview.mockResolvedValue(mockPreview);

      await movieController.getPopularMovies(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockTmdbService.getPopularMovies).toHaveBeenCalledWith(2);
      expect(mockTmdbService.transformMovieToPreview).toHaveBeenCalledWith(
        mockMovieResponse.results[0]
      );
      expect(mockResponse.json).toHaveBeenCalledWith({
        page: 1,
        results: [mockPreview],
        total_pages: 10,
        total_results: 200
      });
    });

    it('should use default page 1 when no page is provided', async () => {
      const mockMovieResponse: MovieResponse = {
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0
      };

      mockTmdbService.getPopularMovies.mockResolvedValue(mockMovieResponse);

      await movieController.getPopularMovies(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockTmdbService.getPopularMovies).toHaveBeenCalledWith(1);
    });
  });

  describe('getMovieDetails', () => {
    it('should return enhanced movie details', async () => {
      const mockMovieDetails = {
        id: 1,
        title: 'Test Movie',
        poster_path: '/test.jpg',
        backdrop_path: '/backdrop.jpg',
        runtime: 120,
        genres: [{ id: 1, name: 'Action' }]
      };

      const mockVideos = {
        results: [
          { key: 'abc123', site: 'YouTube', type: 'Trailer' }
        ]
      };

      const mockReleaseDates = {
        results: [
          {
            iso_3166_1: 'US',
            release_dates: [
              { certification: 'PG-13', type: 3 }
            ]
          }
        ]
      };

      mockRequest.params = { id: '1' };
      mockTmdbService.getMovieDetails.mockResolvedValue(mockMovieDetails as any);
      mockTmdbService.getMovieVideos.mockResolvedValue(mockVideos as any);
      mockTmdbService.getMovieReleaseDates.mockResolvedValue(mockReleaseDates as any);
      mockTmdbService.getImageUrl.mockImplementation((path) => 
        path ? `https://image.tmdb.org/t/p/w500${path}` : null
      );

      await movieController.getMovieDetails(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockTmdbService.getMovieDetails).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Movie',
          poster_url: 'https://image.tmdb.org/t/p/w500/test.jpg',
          backdrop_url: 'https://image.tmdb.org/t/p/w500/backdrop.jpg',
          trailer_url: 'https://www.youtube.com/watch?v=abc123',
          age_restriction: 'PG-13'
        })
      );
    });

    it('should return 400 for invalid movie ID', async () => {
      mockRequest.params = { id: 'invalid' };

      await movieController.getMovieDetails(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid movie ID' });
    });
  });

  describe('searchMovies', () => {
    it('should search movies and return preview format', async () => {
      const mockSearchResponse: MovieResponse = {
        page: 1,
        results: [
          {
            id: 1,
            title: 'Searched Movie',
            overview: 'Test overview',
            poster_path: '/test.jpg',
            backdrop_path: '/backdrop.jpg',
            release_date: '2024-01-01',
            vote_average: 8.5,
            vote_count: 100,
            genre_ids: [1, 2]
          }
        ],
        total_pages: 5,
        total_results: 100
      };

      const mockPreview: MoviePreview = {
        contentId: '1',
        title: 'Searched Movie',
        poster: 'https://test.jpg',
        backdrop: 'https://backdrop.jpg',
        trailer: null,
        genres: ['Action'],
        ageRestriction: null,
        runtime: null,
        seasons: null,
        mediaType: 'movie'
      };

      mockRequest.query = { query: 'test', page: '1' };
      mockTmdbService.searchMovies.mockResolvedValue(mockSearchResponse);
      mockTmdbService.transformMovieToPreview.mockResolvedValue(mockPreview);

      await movieController.searchMovies(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockTmdbService.searchMovies).toHaveBeenCalledWith('test', 1);
      expect(mockResponse.json).toHaveBeenCalledWith({
        page: 1,
        results: [mockPreview],
        total_pages: 5,
        total_results: 100
      });
    });

    it('should return 400 when query is missing', async () => {
      mockRequest.query = {};

      await movieController.searchMovies(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Search query is required' });
    });
  });

  describe('multiSearch', () => {
    it('should filter and transform multi-search results', async () => {
      const mockMultiSearchResponse = {
        page: 1,
        results: [
          { id: 1, title: 'Movie', media_type: 'movie' },
          { id: 2, name: 'TV Show', media_type: 'tv' },
          { id: 3, name: 'Person', media_type: 'person' }
        ],
        total_pages: 1,
        total_results: 3
      };

      const mockMoviePreview: MoviePreview = {
        contentId: '1',
        title: 'Movie',
        poster: null,
        backdrop: null,
        trailer: null,
        genres: [],
        ageRestriction: null,
        runtime: null,
        seasons: null,
        mediaType: 'movie'
      };

      const mockTvPreview: MoviePreview = {
        contentId: '2',
        title: 'TV Show',
        poster: null,
        backdrop: null,
        trailer: null,
        genres: [],
        ageRestriction: null,
        runtime: null,
        seasons: 1,
        mediaType: 'tv'
      };

      mockRequest.query = { query: 'test' };
      mockTmdbService.multiSearch.mockResolvedValue(mockMultiSearchResponse);
      mockTmdbService.transformMultiSearchMovieToPreview.mockResolvedValue(mockMoviePreview);
      mockTmdbService.transformMultiSearchTvToPreview.mockResolvedValue(mockTvPreview);

      await movieController.multiSearch(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockTmdbService.multiSearch).toHaveBeenCalledWith('test', 1);
      expect(mockResponse.json).toHaveBeenCalledWith({
        page: 1,
        results: [mockMoviePreview, mockTvPreview],
        total_pages: 1,
        total_results: 3
      });
    });
  });
});