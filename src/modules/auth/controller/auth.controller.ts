import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Auth } from 'src/modules/common/decorators/auth.decorator';
import {
  type AuthenticatedUser,
  CurrentUser,
} from 'src/modules/common/decorators/current-user.decorator';
import { AUTH_SERVICE } from '../auth.constants';
import { LoginDto } from '../dto/login.dto';
import { type IAuthService } from '../services/auth.service.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authService: IAuthService,
  ) {}

  @Post('login')
  login(
    @Body()
    dto: LoginDto,
  ) {
    return this.authService.login(dto);
  }

  @Post('logout')
  @Auth()
  logout(
    @CurrentUser()
    user: AuthenticatedUser,
  ) {
    return this.authService.logout(user);
  }
}
