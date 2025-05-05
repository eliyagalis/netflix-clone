// src/services/__tests__/tmdb.service.test.ts
import 'reflect-metadata';
import { TMDBService } from '../tmdb.service';
import axios from 'axios';
import * as redisCache from '../../utils/redis.cache';
import * as sideFunctionLogic from '../../utils/sideFunctionLogic';
import { 
  MovieDetails, 
  MovieResponse, 
  Movie 
} from '../../interfaces/IMovieable';
import { 
  VideoResponse, 
  MovieReleaseDatesResponse, 
  ContentRatingsResponse,
  MultiSearchResult 
} from '../../interfaces/ITmbdResponse';
import { GenreListResponse } from '../../interfaces/IGenre';

jest.mock('axios');
jest.mock('../../utils/redis.cache');
jest.mock('../../utils/sideFunctionLogic');

describe('TMDBService', () => {
  let tmdbService: TMDBService;
  const mockApiKey = 'mock-api-key';
  const mockBaseUrl = 'https://api.themoviedb.org/3';

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.TMDB_API_KEY = mockApiKey;
    process.env.TMDB_BASE_URL = mockBaseUrl;
    tmdbService = new TMDBService();
  });

  describe('constructor', () => {
    it.skip('should throw error when API key is undefined or empty', () => {
      const originalApiKey = process.env.TMDB_API_KEY;
      
      // Set API key to empty string to test the condition
      process.env.TMDB_API_KEY = '';
      
      // The constructor should throw when API key is empty
      expect(() => {
        new TMDBService();
      }).toThrow('TMDB API key is missing');
      
      // Restore the original API key
      process.env.TMDB_API_KEY = originalApiKey;
    });

    it('should use default base URL when not provided', () => {
      const originalBaseUrl = process.env.TMDB_BASE_URL;
      delete process.env.TMDB_BASE_URL;
      
      let service: TMDBService | undefined;
      
      expect(() => {
        service = new TMDBService();
      }).not.toThrow();
      
      expect(service).toBeDefined();
      
      // Restore the original base URL
      process.env.TMDB_BASE_URL = originalBaseUrl;
    });
  });

  describe('getPopularMovies', () => {
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

    it('should fetch popular movies successfully', async () => {
      (sideFunctionLogic.handleApiRequest as jest.Mock).mockImplementation(
        (key, callback) => callback()
      );

      (axios.get as jest.Mock).mockResolvedValue({ data: mockMovieResponse });

      const result = await tmdbService.getPopularMovies(1);

      expect(sideFunctionLogic.handleApiRequest).toHaveBeenCalledWith(
        'popularMovies:1',
        expect.any(Function)
      );
      expect(axios.get).toHaveBeenCalledWith(
        `${mockBaseUrl}/movie/popular`,
        {
          params: {
            api_key: mockApiKey,
            page: 1
          }
        }
      );
      expect(result).toEqual(mockMovieResponse);
    });

    it('should handle API errors', async () => {
      const errorMessage = 'API Error';
      (sideFunctionLogic.handleApiRequest as jest.Mock).mockImplementation(
        (key, callback) => callback()
      );
      (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(tmdbService.getPopularMovies()).rejects.toThrow(errorMessage);
    });
  });

  describe('getMovieDetails', () => {
    const mockMovieDetails: MovieDetails = {
      id: 1,
      title: 'Test Movie',
      overview: 'Test overview',
      poster_path: '/test.jpg',
      backdrop_path: '/backdrop.jpg',
      release_date: '2024-01-01',
      vote_average: 8.5,
      vote_count: 100,
      genre_ids: [],
      genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Comedy' }],
      runtime: 120,
      status: 'Released',
      tagline: 'Test tagline',
      budget: 1000000,
      revenue: 2000000,
      production_companies: []
    };

    it('should fetch movie details successfully', async () => {
      (sideFunctionLogic.handleApiRequest as jest.Mock).mockImplementation(
        (key, callback) => callback()
      );
      (axios.get as jest.Mock).mockResolvedValue({ data: mockMovieDetails });

      const result = await tmdbService.getMovieDetails(1);

      expect(result).toEqual(mockMovieDetails);
      expect(axios.get).toHaveBeenCalledWith(
        `${mockBaseUrl}/movie/1`,
        {
          params: {
            api_key: mockApiKey
          }
        }
      );
    });
  });

  describe('searchMovies', () => {
    const mockSearchResponse: MovieResponse = {
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0
    };

    it('should search movies with query', async () => {
      (sideFunctionLogic.handleApiRequest as jest.Mock).mockImplementation(
        (key, callback) => callback()
      );
      (axios.get as jest.Mock).mockResolvedValue({ data: mockSearchResponse });

      const query = 'test';
      const result = await tmdbService.searchMovies(query);

      expect(axios.get).toHaveBeenCalledWith(
        `${mockBaseUrl}/search/movie`,
        {
          params: {
            api_key: mockApiKey,
            query,
            page: 1
          }
        }
      );
      expect(result).toEqual(mockSearchResponse);
    });
  });

  describe('getMovieGenres', () => {
    const mockGenreResponse: GenreListResponse = {
      genres: [
        { id: 1, name: 'Action', mediaType: 'movie' },
        { id: 2, name: 'Comedy', mediaType: 'movie' }
      ]
    };

    it('should fetch movie genres', async () => {
      (sideFunctionLogic.handleApiRequest as jest.Mock).mockImplementation(
        (key, callback) => callback()
      );
      (axios.get as jest.Mock).mockResolvedValue({ data: { genres: mockGenreResponse.genres.map(g => ({ id: g.id, name: g.name })) } });

      const result = await tmdbService.getMovieGenres();

      expect(result.genres).toHaveLength(2);
      expect(axios.get).toHaveBeenCalledWith(
        `${mockBaseUrl}/genre/movie/list`,
        {
          params: {
            api_key: mockApiKey
          }
        }
      );
    });
  });

  describe('getAllGenres', () => {
    const mockMovieGenres: GenreListResponse = {
      genres: [{ id: 1, name: 'Action', mediaType: 'movie' }]
    };

    const mockTvGenres: GenreListResponse = {
      genres: [{ id: 2, name: 'Drama', mediaType: 'tv' }]
    };

    it('should fetch and combine movie and TV genres', async () => {
      // Create a spy instead of mocking
      const handleApiRequestSpy = jest.spyOn(sideFunctionLogic, 'handleApiRequest');
      
      handleApiRequestSpy
        .mockImplementationOnce(async (key, callback) => {
          if (key === 'movieGenres') {
            return callback();
          }
        })
        .mockImplementationOnce(async (key, callback) => {
          if (key === 'tvGenres') {
            return callback();
          }
        });

      (axios.get as jest.Mock)
        .mockResolvedValueOnce({ data: { genres: [{ id: 1, name: 'Action' }] } })
        .mockResolvedValueOnce({ data: { genres: [{ id: 2, name: 'Drama' }] } });

      const result = await tmdbService.getAllGenres();

      expect(result.genres).toHaveLength(2);
      expect(result.genres[0]).toEqual({
        id: 1,
        name: 'Action',
        mediaType: 'movie'
      });
      expect(result.genres[1]).toEqual({
        id: 2,
        name: 'Drama',
        mediaType: 'tv'
      });
    });
  });

  describe('transformMovieToPreview', () => {
    const mockMovie: Movie = {
      id: 1,
      title: 'Test Movie',
      overview: 'Test overview',
      poster_path: '/test.jpg',
      backdrop_path: '/backdrop.jpg',
      release_date: '2024-01-01',
      vote_average: 8.5,
      vote_count: 100,
      genre_ids: [1, 2]
    };

    const mockVideoResponse: VideoResponse = {
      id: 1,
      results: [
        {
          key: 'abc123',
          site: 'YouTube',
          type: 'Trailer'
        }
      ]
    };

    const mockReleaseDatesResponse: MovieReleaseDatesResponse = {
      id: 1,
      results: [
        {
          iso_3166_1: 'US',
          release_dates: [
            {
              certification: 'PG-13',
              type: 3
            }
          ]
        }
      ]
    };

    const mockGenreResponse: GenreListResponse = {
      genres: [
        { id: 1, name: 'Action', mediaType: 'movie' },
        { id: 2, name: 'Comedy', mediaType: 'movie' }
      ]
    };

    it('should transform movie to preview format', async () => {
      // Mock the necessary methods
      jest.spyOn(tmdbService, 'getMovieVideos').mockResolvedValue(mockVideoResponse);
      jest.spyOn(tmdbService, 'getMovieReleaseDates').mockResolvedValue(mockReleaseDatesResponse);
      jest.spyOn(tmdbService, 'getMovieGenres').mockResolvedValue(mockGenreResponse);

      const result = await tmdbService.transformMovieToPreview(mockMovie);

      expect(result).toEqual({
        contentId: '1',
        title: 'Test Movie',
        poster: 'https://image.tmdb.org/t/p/w500/test.jpg',
        backdrop: 'https://image.tmdb.org/t/p/w500/backdrop.jpg',
        trailer: 'https://www.youtube.com/watch?v=abc123',
        genres: ['Action', 'Comedy'],
        ageRestriction: 'PG-13',
        runtime: null,
        seasons: null,
        mediaType: 'movie'
      });
    });
  });

  describe('getImageUrl', () => {
    it('should return full image URL when path is provided', () => {
      const path = '/test.jpg';
      const result = tmdbService.getImageUrl(path);
      expect(result).toBe('https://image.tmdb.org/t/p/w500/test.jpg');
    });

    it('should return null when path is null', () => {
      const result = tmdbService.getImageUrl(null);
      expect(result).toBeNull();
    });

    it('should use custom size parameter', () => {
      const path = '/test.jpg';
      const result = tmdbService.getImageUrl(path, 'w300');
      expect(result).toBe('https://image.tmdb.org/t/p/w300/test.jpg');
    });
  });

  describe('multiSearch', () => {
    const mockMultiSearchResponse = {
      page: 1,
      results: [
        {
          id: 1,
          title: 'Test Movie',
          media_type: 'movie'
        },
        {
          id: 2,
          name: 'Test TV Show',
          media_type: 'tv'
        }
      ] as MultiSearchResult[],
      total_pages: 1,
      total_results: 2
    };

    it('should perform multi-search', async () => {
      (sideFunctionLogic.handleApiRequest as jest.Mock).mockImplementation(
        (key, callback) => callback()
      );
      (axios.get as jest.Mock).mockResolvedValue({ data: mockMultiSearchResponse });

      const query = 'test';
      const result = await tmdbService.multiSearch(query);

      expect(axios.get).toHaveBeenCalledWith(
        `${mockBaseUrl}/search/multi`,
        {
          params: {
            api_key: mockApiKey,
            query,
            page: 1
          }
        }
      );
      expect(result).toEqual(mockMultiSearchResponse);
    });
  });

  describe('getContentByGenre', () => {
    const mockGenreResponse: MovieResponse = {
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0
    };

    it('should fetch movies by genre', async () => {
      (sideFunctionLogic.handleApiRequest as jest.Mock).mockImplementation(
        (key, callback) => callback()
      );
      (axios.get as jest.Mock).mockResolvedValue({ data: mockGenreResponse });

      const genreId = 28; // Action genre
      const result = await tmdbService.getContentByGenre(genreId, 'movie');

      expect(axios.get).toHaveBeenCalledWith(
        `${mockBaseUrl}/discover/movie`,
        {
          params: {
            api_key: mockApiKey,
            with_genres: genreId,
            page: 1
          }
        }
      );
      expect(result).toEqual(mockGenreResponse);
    });

    it('should fetch TV shows by genre', async () => {
      (sideFunctionLogic.handleApiRequest as jest.Mock).mockImplementation(
        (key, callback) => callback()
      );
      (axios.get as jest.Mock).mockResolvedValue({ data: mockGenreResponse });

      const genreId = 18; // Drama genre
      const result = await tmdbService.getContentByGenre(genreId, 'tv', 2);

      expect(axios.get).toHaveBeenCalledWith(
        `${mockBaseUrl}/discover/tv`,
        {
          params: {
            api_key: mockApiKey,
            with_genres: genreId,
            page: 2
          }
        }
      );
    });
  });
});