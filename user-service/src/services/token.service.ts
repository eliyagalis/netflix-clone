import { injectable } from "inversify";
import jwt from 'jsonwebtoken';
import ITokenResponse from "../interfaces/ITokenResponse";
import ITokenService from "../interfaces/ITokenService";
import IUserPayload from "../interfaces/IUserPayload";


@injectable()
export class TokenService implements ITokenService {

    private readonly accessTokenSecret: string;
    private readonly refreshTokenSecret: string;
    private readonly accessTokenExpiry: number; // minutes
    private readonly refreshTokenExpiry: number // days

    constructor(
        accessTokenSecret: string = process.env.JWT_ACCESS_SECRET || '3f8a61b247c9d8e5f436b912af87e9d0c5a72f1d9b4e87c3586a0df5e98216ab',
        refreshTokenSecret: string = process.env.JWT_REFRESH_SECRET || '7d58f9e2c61b3adfe48c95af7632db85019ba647fcde285a4c6e98b71d26a03c',

        accessTokenExpiry: number = 15 * 60 * 1000,//process.env.JWT_ACCESS_EXPIRES_IN || 15
        refreshTokenExpiry: number = 7 * 1000 * 60 * 60 * 24//process.env.JWT_REFRESH_EXPIRES_IN || 7
    ) {
        this.accessTokenSecret = accessTokenSecret;
        this.refreshTokenSecret = refreshTokenSecret;
        this.accessTokenExpiry = accessTokenExpiry;
        this.refreshTokenExpiry = refreshTokenExpiry;
    }
    generateTokens(userPayload: IUserPayload): ITokenResponse {
        const refreshToken = this.generateRefreshToken(userPayload);
        const accessToken = this.generateAccessToken(userPayload);

        return {
            accessToken,
            refreshToken,
        };
    }

    /**
     * Generate just the access token from the refresh token
     */
    refreshAccessToken(refreshToken: string): string  {
        try {
            const userPayload = jwt.verify(refreshToken, this.refreshTokenSecret) as { userId: string }

            const accessToken = jwt.sign(userPayload, this.accessTokenSecret, {
                expiresIn: this.accessTokenExpiry
            });
            return accessToken;
        }
        catch (error) {
            throw new Error ('Invalid refresh token')
        }

    }

    /**
     * Generate the just the access token from user payload
     */
    generateAccessToken(userPayload: IUserPayload) : string {

        const accessToken = jwt.sign(userPayload, this.accessTokenSecret, {
            expiresIn: this.accessTokenExpiry
        })
        return accessToken;
    }

    /**
     * Generate just the refresh token
     */
    generateRefreshToken(userPayload: IUserPayload): string {
        // Calculate expiration date (7 days from now)
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        // Create the JWT token
        const refreshToken = jwt.sign(userPayload, this.refreshTokenSecret, {
            expiresIn: this.refreshTokenExpiry
        });

        // Return the complete refresh token object
        return refreshToken
    }


    /**
     * 
     * Verifies refresh token
     */
    verifyRefreshToken(refreshToken: string): IUserPayload {
        try {
            // This should match how you structured the payload when signing
            const decoded = jwt.verify(refreshToken, this.refreshTokenSecret) as IUserPayload;
            return decoded;
        }
        catch (error) {
            throw new Error ('Invalid refresh token');
        }
    }
}