import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/config/env';
import { JwtStrategy } from './config/jwt.strategy';
import { AUTH_SERVICE, TOKEN_SERVICE } from './auth.constants';
import { JwtTokenService } from './services/jwt-token.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: env.node.jwt_secret,
      signOptions: {
        expiresIn: env.node.jwt_expires,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    {
      provide: TOKEN_SERVICE,
      useClass: JwtTokenService,
    },
    {
      provide: AUTH_SERVICE,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
