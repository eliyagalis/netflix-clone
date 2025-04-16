import { injectable, inject } from 'inversify';
import { TOKENS } from '../tokens';
import IUserRepository from '../interfaces/IUserRepository';
import IUserService from '../interfaces/IUserService';
import UpdateUserDTO from '../DTOs/update.dto';
import IUser from '../interfaces/IUser';
import IProfile from '../interfaces/IProfile';
import IMyListItem from '../interfaces/IMyListItem';
import mongoose from 'mongoose';
import SignupRequestDTO from '../DTOs/signup.dto';
import { hash } from '../utils/bcrypt';
import { AuthService } from './auth.service';
import ITokenResponse from '../interfaces/ITokenResponse';
import IUserPayload from '../interfaces/IUserPayload';

@injectable()
export class UserService implements IUserService {

  constructor(
    @inject(TOKENS.IUserRepository) private userRepository: IUserRepository,
    @inject(TOKENS.IAuthService) private authService: AuthService
  ) { }

}