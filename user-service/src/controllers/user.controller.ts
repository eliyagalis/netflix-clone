import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TOKENS } from '../tokens';
import IUserService from '../interfaces/IUserService';
import { handleError } from '../utils/handle-error-request';
import { SetUserDTO } from '../DTOs/set.dto';

@injectable()
export class UserController {
  constructor(
    @inject(TOKENS.IUserService) private userService: IUserService
  ) { }

  /**
   * Sign up a new user
   */
  async signup(req: Request, res: Response) {
    try {
      const data: SetUserDTO = req.body

      const { email } = req.body;

      const user = await this.userService.signup(email);

      res.status(200)
    } catch (error) {
      handleError(res, error);
    }
  }

  /**
   * Login a user with email and password
   */
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // UserService handles all authentication logic internally
      const result = await this.userService.login(email, password);

      // Set refresh token in HTTP-only cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
      });

      res.cookie('accessToken', result.accessToken, {
        httpOnly: true
      })

      res.status(200).json({ message: 'Login succesful', user: result.user });
    } catch (error) {
      if (error instanceof Error) { //???
        handleError(res, error.message);
      } else {
        handleError(res, error);
      }
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        res.status(401).json({ message: "Refresh token is required" });
        return;
      }

      const accessToken = await this.userService.refreshToken(refreshToken);

      res.cookie('accessToken', accessToken, {
        httpOnly: true
      })

    } catch (error) {
      res.clearCookie('refreshToken');
      handleError(res, error);
    }
  }

  /**
   * Logout user
   */
  logout(req: Request, res: Response) {
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    res.status(200).json({
      message: 'Logout succesfully'
    })
  }

  /**
   * Get current user profile
   */
  async getUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;

      const user = await this.userService.findUserById(userId);

      if (!user) {
        throw new Error('User not found')
      }

      res.status(200).json({
        message: 'User retrived succesfully',
        user: user
      })

    } catch (error) {
      handleError(res, error);
    }
  }

  /**
   * Update user
   */
  async updateUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const updateData = req.body;

      const updatedUser = await this.userService.updateUser(userId, updateData);

      if (!updatedUser) {
        throw new Error('User not found')
      }

      res.status(200).json({
        message: 'User updated succesfully',
        user: updatedUser
      })
    } catch (error) {
      handleError(res, error);
    }
  }
}