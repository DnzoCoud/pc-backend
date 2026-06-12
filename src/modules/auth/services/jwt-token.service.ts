import { Injectable } from '@nestjs/common';
import { ITokenService } from './token.service.interface';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { UserRole } from 'src/modules/users/models/user-role.enum';

@Injectable()
export class JwtTokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(
    userId: string,
    email: string,
    role: UserRole,
  ): Promise<string> {
    const jti = randomUUID();

    return this.jwtService.signAsync({
      sub: userId,
      email,
      role,
      jti,
    });
  }
}
