import 'reflect-metadata';
import { Types } from 'mongoose';
import MongoUserAdapter from '../user-mongo.adapter';
import { UserStatus } from '../../interfaces/IUser';
import IMongoUser from '../../interfaces/IMongoUser';
import IProfile from '../../interfaces/IProfile';

describe('MongoUserAdapter', () => {
  let adapter: MongoUserAdapter;

  beforeEach(() => {
    adapter = new MongoUserAdapter();
  });

  describe('toDomainUser', () => {
    it('should convert MongoDB user to domain user', () => {
      const mongoUser: Partial<IMongoUser> = {
        _id: new Types.ObjectId('507f1f77bcf86cd799439011'),
        email: 'test@example.com',
        password: 'hashedPassword',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '1234567890',
        profiles: [
          {
            _id: new Types.ObjectId('507f1f77bcf86cd799439012'),
            name: 'Profile 1',
            avatar: 'avatar.png',
            isKid: false,
            myList: [],
          },
        ],
        status: UserStatus.ACTIVE,
        subscriptionId: 'sub123',
        lastLogin: new Date('2024-01-01'),
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2024-01-01'),
      };

      const domainUser = adapter.toDomainUser(mongoUser as IMongoUser);

      expect(domainUser).toEqual({
        id: '507f1f77bcf86cd799439011',
        email: 'test@example.com',
        password: 'hashedPassword',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '1234567890',
        profiles: [
          {
            id: '507f1f77bcf86cd799439012',
            name: 'Profile 1',
            avatar: 'avatar.png',
            isKid: false,
            myList: [],
          },
        ],
        status: UserStatus.ACTIVE,
        subscriptionId: 'sub123',
        lastLogin: mongoUser.lastLogin,
        createdAt: mongoUser.createdAt,
        updatedAt: mongoUser.updatedAt,
      });
    });

    it('should handle missing optional fields', () => {
      const mongoUser: Partial<IMongoUser> = {
        _id: new Types.ObjectId('507f1f77bcf86cd799439011'),
        email: 'test@example.com',
        password: 'hashedPassword',
        status: UserStatus.INITIAL,
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
      };

      const domainUser = adapter.toDomainUser(mongoUser as IMongoUser);

      expect(domainUser.profiles).toEqual([]);
      expect(domainUser.firstName).toBeUndefined();
      expect(domainUser.phoneNumber).toBeUndefined();
      expect(domainUser.subscriptionId).toBeUndefined();
    });
  });

  describe('toDbUser', () => {
    it('should convert domain user to MongoDB user', () => {
      const domainUser = {
        id: '507f1f77bcf86cd799439011',
        email: 'test@example.com',
        password: 'hashedPassword',
        firstName: 'John',
        lastName: 'Doe',
        status: UserStatus.ACTIVE,
        profiles: [
          {
            id: '507f1f77bcf86cd799439012',
            name: 'Profile 1',
            avatar: 'avatar.png',
            isKid: false,
            myList: [],
          },
        ],
      };

      const dbUser = adapter.toDbUser(domainUser);

      expect(dbUser._id).toBeInstanceOf(Types.ObjectId);
      expect(dbUser._id?.toString()).toBe('507f1f77bcf86cd799439011');
      expect(dbUser.email).toBe('test@example.com');
      expect(dbUser.profiles?.[0]._id).toBeInstanceOf(Types.ObjectId);
      expect(dbUser.profiles?.[0].name).toBe('Profile 1');
    });

    it('should handle partial domain user data', () => {
      const partialUser = {
        email: 'test@example.com',
        status: UserStatus.INITIAL,
      };

      const dbUser = adapter.toDbUser(partialUser);

      expect(dbUser.email).toBe('test@example.com');
      expect(dbUser.status).toBe(UserStatus.INITIAL);
      expect(dbUser._id).toBeUndefined();
      expect(dbUser.profiles).toBeUndefined();
    });
  });

  describe('profile conversion', () => {
    it('should convert domain profile to DB profile', () => {
      const domainProfile: IProfile = {
        id: '507f1f77bcf86cd799439012',
        name: 'Test Profile',
        avatar: 'avatar.png',
        isKid: true,
        myList: [
          {
            contentId: 'movie123',
            title: 'Test Movie',
            poster: 'poster.jpg',
            trailer: 'trailer.mp4',
            genres: ['Action', 'Adventure'],
            type: 'movie',
            addedAt: new Date('2024-01-01'),
          },
        ],
      };

      const dbProfile = adapter.toDbProfile(domainProfile);

      expect(dbProfile._id).toBeInstanceOf(Types.ObjectId);
      expect(dbProfile.name).toBe('Test Profile');
      expect(dbProfile.isKid).toBe(true);
      expect(dbProfile.myList).toHaveLength(1);
      expect(dbProfile.myList[0].contentId).toBe('movie123');
    });

    it('should convert DB profile to domain profile', () => {
        const dbProfile = {
          _id: new Types.ObjectId('507f1f77bcf86cd799439012'),
          name: 'Test Profile',
          avatar: 'avatar.png',
          isKid: false,
          myList: [
            {
              contentId: 'tv123',
              title: 'Test Show',
              poster: null,
              trailer: null,
              genres: ['Drama'],
              type: 'tv' as 'tv',  // Fix: explicitly type as 'tv'
              numberOfSeasons: 3,
              addedAt: new Date('2024-01-01'),
            },
          ],
        };
      
        const domainProfile = adapter.toDomainProfile(dbProfile);
      
        expect(domainProfile.id).toBe('507f1f77bcf86cd799439012');
        expect(domainProfile.name).toBe('Test Profile');
        expect(domainProfile.myList).toHaveLength(1);
        expect(domainProfile.myList[0].type).toBe('tv');
        expect(domainProfile.myList[0].numberOfSeasons).toBe(3);
      });
  });
});