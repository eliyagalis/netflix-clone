
export default interface IRefreshTokenRecord {
    id: string;
    userId: string;
    tokenHash: string; // store hash, not actual token
    expiresAt: Date;
    createdAt: Date;
    isRevoked: boolean;
    revokedAt?: Date;
    deviceInfo?: string;
}
