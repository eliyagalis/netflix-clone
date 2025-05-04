// src/setupTests.ts
import 'reflect-metadata';

// Mock environment variables
process.env.TMDB_API_KEY = 'mock-api-key';
process.env.TMDB_BASE_URL = 'https://api.themoviedb.org/3';
process.env.REDIS_URL = 'redis://localhost:6379';

// Mock console methods to reduce noise in test output
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
  log: jest.fn(),  // Also silence console.log during tests
};