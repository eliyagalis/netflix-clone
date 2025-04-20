import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TOKENS } from '../tokens';
import IUserService from '../interfaces/IUserService';

@injectable()
export class UserController {
  constructor(
    @inject(TOKENS.IUserService) private userService: IUserService
  ) {}

  /**
   * Sign up a new user
   */
  async signup(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      
      const user = await this.userService.signup(email);
      
      this.created(res, { 
        message: 'User created successfully',
        userId: user.id,
        status: user.status
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  /**
   * Login a user with email and password
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      
      // UserService handles all authentication logic internally
      const result = await this.userService.login(email, password);
      
      // Set refresh token in HTTP-only cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
      });
      
      this.success(res, {
        accessToken: result.accessToken,
        user: result.user
      });
    } catch (error) {
      if (error instanceof Error) {
        this.unauthorized(res, error.message);
      } else {
        this.handleError(res, error);
      }
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken;
      
      if (!refreshToken) {
        this.unauthorized(res, 'Refresh token is required');
        return;
      }
      
      const accessToken = await this.userService.refreshToken(refreshToken);
      
      this.success(res, { accessToken });
    } catch (error) {
      res.clearCookie('refreshToken');
      this.unauthorized(res, 'Invalid refresh token');
    }
  }

  /**
   * Logout user
   */
  logout(req: Request, res: Response): void {
    res.clearCookie('refreshToken');
    this.success(res, { message: 'Logged out successfully' });
  }
  
  /**
   * Get current user profile
   */
  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      
      const user = await this.userService.findUserById(userId);
      
      if (!user) {
        this.notFound(res, 'User not found');
        return;
      }
      
      this.success(res, user);
    } catch (error) {
      this.handleError(res, error);
    }
  }
  
  /**
   * Update user
   */
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const updateData = req.body;
      
      const updatedUser = await this.userService.updateUser(userId, updateData);
      
      if (!updatedUser) {
        this.notFound(res, 'User not found');
        return;
      }
      
      this.success(res, updatedUser);
    } catch (error) {
      this.handleError(res, error);
    }
  }
}