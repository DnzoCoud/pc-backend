import { Injectable } from '@nestjs/common';
import { ITokenService } from './token.service.interface';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';

@Injectable()
export class JwtTokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(userId: string, email: string): Promise<string> {
    const jti = randomUUID();

    return this.jwtService.signAsync({
      sub: userId,
      email,
      jti,
    });
  }
}
