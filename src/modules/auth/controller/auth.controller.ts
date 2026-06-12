import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AUTH_SERVICE } from '../auth.constants';
import { type IAuthService } from '../services/auth.service.interface';
import { LoginDto } from '../dto/login.dto';

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
}
