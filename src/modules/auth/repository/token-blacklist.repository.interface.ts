import { TokenBlacklistEntity } from '../models/token-blacklist.entity';

export interface ITokenBlacklistRepository {
  save(token: TokenBlacklistEntity): Promise<TokenBlacklistEntity>;
  findByJti(jti: string): Promise<TokenBlacklistEntity | null>;
}
