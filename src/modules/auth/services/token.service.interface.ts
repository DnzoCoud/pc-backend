export interface ITokenService {
  generateAccessToken(userId: string, email: string): Promise<string>;
}
