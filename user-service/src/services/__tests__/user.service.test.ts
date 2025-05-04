import 'reflect-metadata';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import IUserRepository from '../../interfaces/IUserRepository';
import IAuthService from '../../interfaces/IAuthService';
import IUserBuilder from '../../interfaces/IUserBuilder';
import { EventBus } from '../../utils/eventBus';
import IUser, { UserStatus } from '../../interfaces/IUser';
import SignupRequestDTO from '../../DTOs/signup.dto';
import LoginRequestDTO from '../../DTOs/login.dto';

describe('UserService', () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<IUserRepository>;
  let mockAuthService: jest.Mocked<IAuthService>;
  let mockUserBuilder: jest.Mocked<IUserBuilder>;
  let mockEventBus: Partial<EventBus>;

  beforeEach(() => {
    // Create mocks
    mockUserRepository = {
      addInitialUser: jest.fn(),
      addSubscriptionId: jest.fn(),
      findByEmail: jest.fn(),
      findUserById: jest.fn(),
      updateUser: jest.fn(),
      addProfile: jest.fn(),
      addMyListItem: jest.fn(),
      getProfiles: jest.fn(),
    } as jest.Mocked<IUserRepository>;

    mockAuthService = {
      login: jest.fn(),
      refreshAccessToken: jest.fn(),
    } as jest.Mocked<IAuthService>;

    mockUserBuilder = {
      withEmailAndPassword: jest.fn().mockReturnThis(),
      withId: jest.fn().mockReturnThis(),
      build: jest.fn(),
    } as any;

    mockEventBus = {
      subscribe: jest.fn(),
      publish: jest.fn(),
      unsubscribe: jest.fn(),
    };

    userService = new UserService(
      mockUserRepository,
      mockAuthService,
      mockUserBuilder,
      mockEventBus as EventBus
    );
  });

  describe('login', () => {
    it('should successfully login a user', async () => {
      const loginDto: LoginRequestDTO = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockUser: IUser = {
        id: 'user123',
        email: loginDto.email,
        password: 'hashedPassword',
        status: UserStatus.ACTIVE,
        profiles: [{ 
          id: 'profile1', 
          name: 'Profile 1', 
          avatar: 'avatar.png',
          isKid: false,
          myList: []
        }],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const mockTokens = {
        accessToken: 'access_token',
        refreshToken: 'refresh_token',
      };

      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      mockAuthService.login.mockResolvedValue(mockTokens);
      mockUserRepository.getProfiles.mockResolvedValue(mockUser.profiles);

      const result = await userService.login(loginDto);

      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(loginDto.email);
      expect(mockAuthService.login).toHaveBeenCalled();
      expect(result.tokens).toEqual(mockTokens);
      expect(result.status).toEqual(UserStatus.ACTIVE);
    });
  });
});