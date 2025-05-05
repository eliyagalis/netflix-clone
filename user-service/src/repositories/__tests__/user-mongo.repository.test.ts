import 'reflect-metadata';
import { UserMongoRepository } from '../user-mongo.repository';
import IUserAdapter from '../../interfaces/IUserAdapter';
import IStatusService from '../../interfaces/IStatusService';
import User from '../../models/user-mongo.model';
import { UserStatus } from '../../interfaces/IUser';

jest.mock('../../models/user-mongo.model');

describe('UserMongoRepository', () => {
  let userRepository: UserMongoRepository;
  let mockUserAdapter: jest.Mocked<IUserAdapter>;
  let mockStatusService: jest.Mocked<IStatusService>;

  beforeEach(() => {
    mockUserAdapter = {
      toDomainUser: jest.fn(),
      toDbUser: jest.fn(),
      toDomainProfile: jest.fn(),
      toDbProfile: jest.fn(),
      toDomainMyListItem: jest.fn(),
      toDbMyListItem: jest.fn(),
    } as jest.Mocked<IUserAdapter>;

    mockStatusService = {
      isValidStatusTransition: jest.fn(),
      getStatusAfterSubscription: jest.fn(),
      getSuspendedStatus: jest.fn(),
    } as jest.Mocked<IStatusService>;

    userRepository = new UserMongoRepository(mockUserAdapter, mockStatusService);
  });

  describe('addInitialUser', () => {
    it('should create a new initial user', async () => {
      const signupDto = { email: 'test@example.com', password: 'hashedPassword' };
      const mockUser = { _id: 'user123', ...signupDto };
      const domainUser = { id: 'user123', ...signupDto };

      (User as any).mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(mockUser),
      }));

      mockUserAdapter.toDomainUser.mockReturnValue(domainUser as any);

      const result = await userRepository.addInitialUser(signupDto);

      expect(User).toHaveBeenCalledWith(signupDto);
      expect(mockUserAdapter.toDomainUser).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(domainUser);
    });
  });

  describe('findByEmail', () => {
    it('should find user by email', async () => {
      const email = 'test@example.com';
      const mockUser = { _id: 'user123', email };
      const domainUser = { id: 'user123', email };

      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      mockUserAdapter.toDomainUser.mockReturnValue(domainUser as any);

      const result = await userRepository.findByEmail(email);

      expect(User.findOne).toHaveBeenCalledWith({ email });
      expect(mockUserAdapter.toDomainUser).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(domainUser);
    });

    it('should return null if user not found', async () => {
      const email = 'nonexistent@example.com';

      (User.findOne as jest.Mock).mockResolvedValue(null);

      const result = await userRepository.findByEmail(email);

      expect(User.findOne).toHaveBeenCalledWith({ email });
      expect(result).toBeNull();
    });
  });

  describe('addSubscriptionId', () => {
    it('should add subscription ID to user', async () => {
      const userId = 'user123';
      const subscriptionDto = { subscriptionId: 'sub123' };
      const mockUser = { _id: userId, status: UserStatus.AWAITING_PAYMENT };
      const updatedUser = { _id: userId, subscriptionId: 'sub123', status: UserStatus.ACTIVE };
      const domainUser = { id: userId, subscriptionId: 'sub123', status: UserStatus.ACTIVE };

      (User.findById as jest.Mock).mockResolvedValue(mockUser);
      mockStatusService.getStatusAfterSubscription.mockReturnValue(UserStatus.ACTIVE);
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedUser);
      mockUserAdapter.toDomainUser.mockReturnValue(domainUser as any);

      const result = await userRepository.addSubscriptionId(userId, subscriptionDto);

      expect(User.findById).toHaveBeenCalledWith(userId);
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        userId,
        { subscriptionId: subscriptionDto.subscriptionId, status: UserStatus.ACTIVE },
        { new: true }
      );
      expect(result).toEqual(domainUser);
    });
  });
});