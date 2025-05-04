import ITokenResponse from "./ITokenResponse";
import IUserPayload from "./IUserPayload";

export default interface IAuthSrvice {
    
    login(userPayload: IUserPayload, password: string, hashedPassword: string): Promise<ITokenResponse>;

    refreshAccessToken(refreshToken: string): Promise<ITokenResponse>;
    
}