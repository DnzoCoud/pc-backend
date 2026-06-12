import { Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AUDIT_SERVICE } from 'src/modules/audit/audit.constants';
import { type IAuditService } from 'src/modules/audit/services/audit.service.interface';
import { AuthenticatedUser } from 'src/modules/common/decorators/current-user.decorator';
import { UserMapper } from 'src/modules/users/mappers/user.mapper';
import { type IUserRepository } from 'src/modules/users/repositories/user.repository.interface';
import { USER_REPOSITORY } from 'src/modules/users/users.constants';
import { BLACKLIST_REPOSITORY, TOKEN_SERVICE } from '../auth.constants';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { LoginDto } from '../dto/login.dto';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';
import { TokenBlacklistEntity } from '../models/token-blacklist.entity';
import { type ITokenBlacklistRepository } from '../repository/token-blacklist.repository.interface';
import { type IAuthService } from './auth.service.interface';
import { type ITokenService } from './token.service.interface';

export class AuthService implements IAuthService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,

    @Inject(TOKEN_SERVICE)
    private readonly tokenService: ITokenService,

    @Inject(BLACKLIST_REPOSITORY)
    private readonly blacklistRepo: ITokenBlacklistRepository,

    @Inject(AUDIT_SERVICE)
    private readonly auditService: IAuditService,
  ) {}

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmailWithPassword(dto.email);

    if (!user) {
      throw new InvalidCredentialsException();
    }

    const isValidPassword = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );

    if (!isValidPassword) {
      throw new InvalidCredentialsException();
    }

    const accessToken = await this.tokenService.generateAccessToken(
      user.id,
      user.email,
      user.role,
    );

    this.auditService.publish({
      userId: user.id,
      action: 'LOGIN',
      resource: 'AUTH',
      metadata: {
        email: user.email,
      },
    });

    return {
      accessToken,
      user: UserMapper.toResponseDto(user),
    };
  }

  async logout(user: AuthenticatedUser): Promise<void> {
    const blacklistedToken = new TokenBlacklistEntity();

    blacklistedToken.jti = user.jti;
    blacklistedToken.userId = user.id;

    await this.blacklistRepo.save(blacklistedToken);

    this.auditService.publish({
      userId: user.id,
      action: 'LOGOUT',
      resource: 'AUTH',
      metadata: {
        email: user.email,
      },
    });
  }
}
