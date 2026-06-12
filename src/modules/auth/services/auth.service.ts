import { Inject } from '@nestjs/common';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { LoginDto } from '../dto/login.dto';
import { type IAuthService } from './auth.service.interface';
import { USER_REPOSITORY } from 'src/modules/users/users.constants';
import { TOKEN_SERVICE } from '../auth.constants';
import { type ITokenService } from './token.service.interface';
import { type IUserRepository } from 'src/modules/users/repositories/user.repository.interface';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';
import * as bcrypt from 'bcrypt';
import { UserMapper } from 'src/modules/users/mappers/user.mapper';

export class AuthService implements IAuthService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,

    @Inject(TOKEN_SERVICE)
    private readonly tokenService: ITokenService,
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
    );

    return {
      accessToken,
      user: UserMapper.toResponseDto(user),
    };
  }
}
