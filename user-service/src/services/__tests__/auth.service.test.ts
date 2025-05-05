import 'reflect-metadata';
import { AuthService } from '../auth.service';
import ITokenService from '../../interfaces/ITokenService';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let authService: AuthService;
  let mockTokenService: jest.Mocked<ITokenService>;

  beforeEach(() => {
    mockTokenService = {
      generateTokens: jest.fn(),
      generateAccessToken: jest.fn(),
      refreshAccessToken: jest.fn(),
      verifyRefreshToken: jest.fn(),
    } as jest.Mocked<ITokenService>;

    authService = new AuthService(mockTokenService);
  });

  describe('login', () => {
    it('should successfully login with valid credentials', async () => {
      const userPayload = { userId: 'user123', email: 'test@example.com' };
      const password = 'password123';
      const hashedPassword = 'hashedPassword';
      const mockTokens = {
        accessToken: 'access_token',
        refreshToken: 'refresh_token',
      };

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockTokenService.generateTokens.mockReturnValue(mockTokens);

      const result = await authService.login(userPayload, password, hashedPassword);

      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(mockTokenService.generateTokens).toHaveBeenCalledWith(userPayload);
      expect(result).toEqual(mockTokens);
    });

    it('should throw error for invalid password', async () => {
      const userPayload = { userId: 'user123', email: 'test@example.com' };
      const password = 'wrongpassword';
      const hashedPassword = 'hashedPassword';

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        authService.login(userPayload, password, hashedPassword)
      ).rejects.toThrow('Invalid Email or password');
    });
  });

  describe('refreshAccessToken', () => {
    it('should successfully refresh access token', async () => {
      const refreshToken = 'valid_refresh_token';
      const userPayload = { userId: 'user123', email: 'test@example.com' };
      const mockTokens = {
        accessToken: 'new_access_token',
        refreshToken: 'new_refresh_token',
      };

      mockTokenService.verifyRefreshToken.mockReturnValue(userPayload);
      mockTokenService.generateTokens.mockReturnValue(mockTokens);

      const result = await authService.refreshAccessToken(refreshToken);

      expect(mockTokenService.verifyRefreshToken).toHaveBeenCalledWith(refreshToken);
      expect(mockTokenService.generateTokens).toHaveBeenCalledWith(userPayload);
      expect(result).toEqual(mockTokens);
    });

    it('should throw error for invalid refresh token', async () => {
      const refreshToken = 'invalid_refresh_token';

      mockTokenService.verifyRefreshToken.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await expect(authService.refreshAccessToken(refreshToken)).rejects.toThrow('Token refresh failed');
    });
  });
});