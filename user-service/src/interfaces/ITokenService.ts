import ITokenResponse from "./ITokenResponse";
import IUserPayload from "./IUserPayload";

export default interface ITokenService {
// Generate new tokens
  generateTokens(userPayload: IUserPayload): ITokenResponse;
  
  // Generate access token
  generateAccessToken(userPayload: IUserPayload): string;
  
  // Refreshes access token
  refreshAccessToken(refreshToken: string): string

  // Verify refresh token
  verifyRefreshToken(refreshToken: string): IUserPayload;
  
}