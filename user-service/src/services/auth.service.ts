import { compare } from 'bcrypt';
import ITokenService from '../interfaces/ITokenService';
import ITokenResponse from '../interfaces/ITokenResponse';
import { inject, injectable } from 'inversify';
import IAuthSrvice from '../interfaces/IAuthService';
import IUserPayload from '../interfaces/IUserPayload';
import { TOKENS } from '../tokens';

@injectable()
export class AuthService implements IAuthSrvice {
  
  constructor(
    @inject(TOKENS.ITokenService) private tokenService: ITokenService,
  ) {}

  /**
   * Login method - authenticate user and issue tokens
   * Note: This assumes UserService has already verified credentials
   */
  async login(userPayload: IUserPayload, password: string, hashedPassword: string): Promise<ITokenResponse> {

    const isPasswordValid = await this.verifyPassword(password, hashedPassword)

    //#TODO add sleep for security

    if (!isPasswordValid) {
      throw new Error('Invalid Email or password'); //Error need to be identical to email error for security concerns.
    }
    // Generate access token and refresh tokens
    return this.tokenService.generateTokens(userPayload)
  }

  /**
   * Refresh access token using a refresh token
   */
  refreshAccessToken(refreshToken: string): string {

    try {
      const userPayload = this.tokenService.verifyRefreshToken(refreshToken);
      //can add additional logic
      return this.tokenService.generateAccessToken(userPayload);
    } catch (error) {
      throw new Error('Token refresh failed')
    }
  }

  async verifyPassword(password: string, hashedPassword: string) : Promise<Boolean> {
    return await compare(password, hashedPassword);
  }

}