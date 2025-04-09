import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { TOKENS } from '../tokens';
import { UserService } from '../services/user.service';
import { UpdateUserDTO } from '../DTOs/update.dto';
import { handleError } from '../utils/handle-error-request';

@injectable()
export class UserController {
  private userService: UserService;

  constructor(
    @inject(TOKENS.IUserService) userService: UserService
  ) {
    this.userService = userService;
  }

  /**
   * Get current user profile
   * @route GET /api/users/me
   */
  getProfile = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.userId;
      
      if (!userId) {
        return res.status(401).json({ message: 'Authentication required' });
      }

      const user = await this.userService.getUserProfile(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      return handleError(res, error);
    }
  };

  /**
   * Update user profile
   * @route PUT /api/users/me
   */
  updateProfile = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.userId;
      
      if (!userId) {
        return res.status(401).json({ message: 'Authentication required' });
      }

      const updateData: UpdateUserDTO = req.body;
      
      if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'No update data provided' });
      }

      const updatedUser = await this.userService.updateUserProfile(userId, updateData);
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({
        message: 'Profile updated successfully',
        user: updatedUser
      });
    } catch (error) {
      return handleError(res, error);
    }
  };

  /**
   * Get profile details including my list
   * @route GET /api/users/profiles/:profileId
   */
  getProfileDetails = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.userId;
      const { profileId } = req.params;
      
      if (!userId) {
        return res.status(401).json({ message: 'Authentication required' });
      }

      const profile = await this.userService.getProfileDetails(userId, profileId);
      
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }

      return res.status(200).json(profile);
    } catch (error) {
      return handleError(res, error);
    }
  };

  /**
   * Add item to profile's my list
   * @route POST /api/users/profiles/:profileId/mylist
   */
  addToMyList = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.userId;
      const { profileId } = req.params;
      const { contentId, type } = req.body;
      
      if (!userId) {
        return res.status(401).json({ message: 'Authentication required' });
      }

      if (!contentId || !type) {
        return res.status(400).json({ message: 'Content ID and type are required' });
      }

      if (!['movie', 'series'].includes(type)) {
        return res.status(400).json({ message: 'Type must be either "movie" or "series"' });
      }

      const myList = await this.userService.addToMyList(
        userId, 
        profileId, 
        contentId, 
        type as 'movie' | 'series'
      );
      
      if (myList === null) {
        return res.status(404).json({ message: 'User or profile not found' });
      }

      return res.status(201).json({
        message: 'Item added to My List',
        myList
      });
    } catch (error) {
      return handleError(res, error);
    }
  };

  /**
   * Remove item from profile's my list
   * @route DELETE /api/users/profiles/:profileId/mylist/:contentId
   */
  removeFromMyList = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.userId;
      const { profileId, contentId } = req.params;
      
      if (!userId) {
        return res.status(401).json({ message: 'Authentication required' });
      }

      const myList = await this.userService.removeFromMyList(userId, profileId, contentId);
      
      if (myList === null) {
        return res.status(404).json({ message: 'User, profile, or content not found' });
      }

      return res.status(200).json({
        message: 'Item removed from My List',
        myList
      });
    } catch (error) {
      return handleError(res, error);
    }
  };
}