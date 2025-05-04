import 'reflect-metadata';
import { Request, Response } from 'express';
import { UserController } from '../user.controller';
import IUserService from '../../interfaces/IUserService';
import { UserStatus } from '../../interfaces/IUser';

describe('UserController', () => {
  let userController: UserController;
  let mockUserService: jest.Mocked<IUserService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockUserService = {
      signup: jest.fn(),
      login: jest.fn(),
      refreshToken: jest.fn(),
      findUserById: jest.fn(),
      findByEmail: jest.fn(),
      updateUser: jest.fn(),
      addProfile: jest.fn(),
      addToMyList: jest.fn(),
      getProfiles: jest.fn(),
      getDetailedProfile: jest.fn(),
      addSubscription: jest.fn(),
    } as jest.Mocked<IUserService>;

    userController = new UserController(mockUserService);

    mockRequest = {
      body: {},
      cookies: {},
      header: jest.fn(),
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
      clearCookie: jest.fn().mockReturnThis(),
    };
  });

  describe('signup', () => {
    it('should handle successful signup', async () => {
      const signupData = { email: 'test@example.com', password: 'password123' };
      const tokens = { accessToken: 'access', refreshToken: 'refresh' };

      mockRequest.body = signupData;
      mockUserService.signup.mockResolvedValue(tokens);

      await userController.signup(mockRequest as Request, mockResponse as Response);

      expect(mockUserService.signup).toHaveBeenCalledWith(signupData);
      expect(mockResponse.cookie).toHaveBeenCalledWith('refreshToken', tokens.refreshToken, { httpOnly: true });
      expect(mockResponse.cookie).toHaveBeenCalledWith('accessToken', tokens.accessToken, { httpOnly: true });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User signup' });
    });
  });

  describe('login', () => {
    it('should handle successful login', async () => {
      const loginData = { email: 'test@example.com', password: 'password123' };
      const loginResult = {
        tokens: { accessToken: 'access', refreshToken: 'refresh' },
        profiles: [{ id: 'profile1', name: 'Profile 1' }],
        status: UserStatus.ACTIVE,
      };

      mockRequest.body = loginData;
      mockUserService.login.mockResolvedValue(loginResult);

      await userController.login(mockRequest as Request, mockResponse as Response);

      expect(mockUserService.login).toHaveBeenCalledWith(loginData);
      expect(mockResponse.cookie).toHaveBeenCalledWith('refreshToken', loginResult.tokens.refreshToken, { httpOnly: true });
      expect(mockResponse.cookie).toHaveBeenCalledWith('accessToken', loginResult.tokens.accessToken, { httpOnly: true });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Login succesful',
        profiles: loginResult.profiles,
        status: loginResult.status,
      });
    });
  });

  describe('addProfile', () => {
    it('should handle adding a profile', async () => {
      const userId = 'user123';
      const profileData = { name: 'New Profile', avatar: 'avatar.png', isKid: false };
      const updatedUser = { id: userId, profiles: [profileData] };
      const profiles = [{ id: 'profile1', name: 'New Profile', avatar: 'avatar.png' }];

      mockRequest.header = jest.fn().mockReturnValue(userId);
      mockRequest.body = profileData;
      mockUserService.addProfile.mockResolvedValue(updatedUser as any);
      mockUserService.getProfiles.mockResolvedValue(profiles);

      await userController.addProfile(mockRequest as Request, mockResponse as Response);

      expect(mockUserService.addProfile).toHaveBeenCalledWith(userId, profileData);
      expect(mockUserService.getProfiles).toHaveBeenCalledWith(userId);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Profile added',
        profiles: profiles,
      });
    });
  });
});