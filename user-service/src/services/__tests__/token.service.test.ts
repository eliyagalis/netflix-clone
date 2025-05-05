import 'reflect-metadata';
import { TokenService } from '../token.service';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('TokenService', () => {
  let tokenService: TokenService;
  const accessSecret = 'access_secret';
  const refreshSecret = 'refresh_secret';

  beforeEach(() => {
    tokenService = new TokenService(accessSecret, refreshSecret, 15, 7);
    jest.clearAllMocks();
  });

  describe('generateTokens', () => {
    it('should generate access and refresh tokens', () => {
      const userPayload = { userId: 'user123', email: 'test@example.com' };
      const mockAccessToken = 'access_token';
      const mockRefreshToken = 'refresh_token';

      // Mock jwt.sign to return correct tokens based on the options
      (jwt.sign as jest.Mock)
        .mockImplementationOnce((payload, secret) => {
          if (secret === accessSecret) return mockAccessToken;
          return mockRefreshToken;
        })
        .mockImplementationOnce((payload, secret) => {
          if (secret === refreshSecret) return mockRefreshToken;
          return mockAccessToken;
        });

      const result = tokenService.generateTokens(userPayload);

      expect(jwt.sign).toHaveBeenCalledTimes(2);
      expect(result.accessToken).toBe(mockAccessToken);
      expect(result.refreshToken).toBe(mockRefreshToken);
    });
  });
});