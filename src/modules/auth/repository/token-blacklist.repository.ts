import { Injectable } from '@nestjs/common';
import { ITokenBlacklistRepository } from './token-blacklist.repository.interface';
import { TokenBlacklistEntity } from '../models/token-blacklist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TokenBlacklistRepository implements ITokenBlacklistRepository {
  constructor(
    @InjectRepository(TokenBlacklistEntity)
    private readonly repository: Repository<TokenBlacklistEntity>,
  ) {}

  save(token: TokenBlacklistEntity): Promise<TokenBlacklistEntity> {
    return this.repository.save(token);
  }

  findByJti(jti: string): Promise<TokenBlacklistEntity | null> {
    return this.repository.findOneBy({ jti });
  }
}
