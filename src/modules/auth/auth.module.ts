import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/config/env';
import { JwtStrategy } from './config/jwt.strategy';
import {
  AUTH_SERVICE,
  BLACKLIST_REPOSITORY,
  TOKEN_SERVICE,
} from './auth.constants';
import { JwtTokenService } from './services/jwt-token.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import type { StringValue } from 'ms';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { TokenBlacklistRepository } from './repository/token-blacklist.repository';
import { AuditModule } from '../audit/audit.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenBlacklistEntity } from './models/token-blacklist.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([TokenBlacklistEntity]),
    PassportModule,
    JwtModule.register({
      secret: env.node.jwt_secret,
      signOptions: {
        expiresIn: env.node.jwt_expires as StringValue,
      },
    }),
    UsersModule,
    AuditModule,
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
    {
      provide: BLACKLIST_REPOSITORY,
      useClass: TokenBlacklistRepository,
    },
  ],
  exports: [AUTH_SERVICE, TOKEN_SERVICE, BLACKLIST_REPOSITORY],
})
export class AuthModule {}
