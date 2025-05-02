import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TOKENS } from '../tokens';
import IUserService from '../interfaces/IUserService';
import { handleError } from '../utils/handle-error-request';
import { SetUserDTO } from '../DTOs/set.dto';
import SignupRequestDTO from '../DTOs/signup.dto';
import LoginRequestDTO from '../DTOs/login.dto';
import IUser from '../interfaces/IUser';
import { date } from 'joi';
import { UpdateRequestDTO , AddProfileDTO, AddMyListItemDTO }from '../DTOs/update.dto';


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
      const data: SignupRequestDTO = req.body

      const tokens = await this.userService.signup(data);

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
      });

      res.cookie('accessToken', tokens.accessToken, {
        httpOnly: true
      })

      res.status(200).json({message: "User signup"})
    } catch (error) {
      handleError(res, error);
    }
  }

  /**
   * Login a user with email and password
   */
  async login(req: Request, res: Response) {
    try {
      const data: LoginRequestDTO = req.body;

      // UserService handles all authentication logic internally
      const {tokens, profiles, status} = await this.userService.login(data);


      // Set refresh token in HTTP-only cookie
      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
      });

      res.cookie('accessToken', tokens.accessToken, {
        httpOnly: true
      })

      res.status(200).json({ message: 'Login succesful', profiles: profiles, status: status});
    } catch (error) {
      if (error instanceof Error) { //???
        handleError(res, error.message);
      } else {
        handleError(res, error);
      }
    }

    // user status 
    // profilePreview  
  }

  async loginAfterPayment(req: Request, res: Response) {
    try {
      
    } catch (error) {
      handleError(res, error);
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
  async logout(req: Request, res: Response) {
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
      const userId = req.header('id');

      if (!userId) {
        return res.status(401).json({ message: "User ID not provided" });
      }

      const user = await this.userService.findUserById(userId);

      if (!user) {
        throw new Error('User not found')
      }

      res.status(200).json({
        message: 'User retrived succesfully',
        data: user
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
      const userId = req.header('user_id');

      if (!userId) {
        return res.status(401).json({ message: "User ID not provided" });
      }

      const updateData : UpdateRequestDTO = req.body;

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

  async addProfile(req: Request, res: Response) {
    try {
      const userId = req.header('user_id');

      if (!userId) {
        return res.status(401).json({ message: "User ID not provided" });
      }

      const data: AddProfileDTO = req.body;

      const user = await this.userService.addProfile(userId, data);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
    } catch (error) {
      handleError(res, error)
    }
  }

  async checkEmailExist(req: Request, res: Response) {
    try {
      const email = req.header('email');
  
      if (!email) {
        return res.status(400).json({ message: "User email not provided" });
      }
  
      const user = await this.userService.findByEmail(email);
      return res.status(200).json({ 
        message: user ? "User exists" : "User does not exist", 
        exists: !!user 
      });
    } catch (error) {
      handleError(res, error);
    }
  }  
}