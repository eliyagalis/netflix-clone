import 'reflect-metadata';
import request from 'supertest';
import { app } from '../../app';
import { container } from '../../config/inversify';
import { TOKENS } from '../../tokens';
import { dbConnection } from '../../config/db';
import User from '../../models/user-mongo.model';

describe('User Flow Integration Test', () => {
  beforeAll(async () => {
    await dbConnection();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  describe('Complete user flow', () => {
    it('should handle signup, login, and profile creation flow', async () => {
      // 1. Signup
      const signupData = {
        email: 'test@example.com',
        password: 'password123',
      };
  
      const signupResponse = await request(app)
        .post('/api/v1/users/signup')
        .send(signupData);
  
      expect(signupResponse.status).toBe(200);
      expect(signupResponse.body.message).toBe('User signup');
  
      // Extract cookies - properly handle the type
      const cookieHeader = signupResponse.headers['set-cookie'];
      let cookies: string[] = [];
      
      if (Array.isArray(cookieHeader)) {
        cookies = cookieHeader;
      } else if (typeof cookieHeader === 'string') {
        cookies = [cookieHeader];
      }
  
      const accessToken = cookies.find((cookie: string) => cookie.startsWith('accessToken='));
      const refreshToken = cookies.find((cookie: string) => cookie.startsWith('refreshToken='));
  
      expect(accessToken).toBeDefined();
      expect(refreshToken).toBeDefined();
  
      // 2. Login
      const loginResponse = await request(app)
        .post('/api/v1/users/login')
        .send({
          email: signupData.email,
          password: signupData.password,
        });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.message).toBe('Login succesful');
      expect(loginResponse.body.profiles).toBeDefined();
      expect(loginResponse.body.status).toBeDefined();

      // 3. Add Profile
      const profileData = {
        name: 'Test Profile',
        avatar: 'avatar.png',
        isKid: false,
      };

      const user = await User.findOne({ email: signupData.email });
      
      const profileResponse = await request(app)
        .post('/api/v1/users/profile')
        .set('user_id', user!._id.toString())
        .set('Cookie', cookies)
        .send(profileData);

      expect(profileResponse.status).toBe(200);
      expect(profileResponse.body.message).toBe('Profile added');
      expect(profileResponse.body.profiles).toHaveLength(1);

      // 4. Get Profile Preview
      const profilesResponse = await request(app)
        .get('/api/v1/users/profiles')
        .set('user_id', user!._id.toString())
        .set('Cookie', cookies);

      expect(profilesResponse.status).toBe(200);
      expect(profilesResponse.body.profiles).toHaveLength(1);
      expect(profilesResponse.body.profiles[0].name).toBe(profileData.name);
    });
  });
});