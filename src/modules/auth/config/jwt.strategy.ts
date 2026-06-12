import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { env } from 'src/config/env';
import { BLACKLIST_REPOSITORY } from '../auth.constants';
import { type ITokenBlacklistRepository } from '../repository/token-blacklist.repository.interface';
import { JwtPayload } from '../dto/jwt-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(BLACKLIST_REPOSITORY)
    private readonly blacklistRepo: ITokenBlacklistRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.node.jwt_secret,
    });
  }

  async validate(payload: JwtPayload) {
    const blacklistedToken = await this.blacklistRepo.findByJti(payload.jti);

    if (blacklistedToken) {
      throw new UnauthorizedException('Token revoked');
    }

    return {
      id: payload.sub,
      email: payload.email,
      jti: payload.jti,
      role: payload.role,
    };
  }
}
