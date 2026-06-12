import { AuthenticatedUser } from 'src/modules/common/decorators/current-user.decorator';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { LoginDto } from '../dto/login.dto';

export interface IAuthService {
  login(dto: LoginDto): Promise<AuthResponseDto>;
  logout(user: AuthenticatedUser): Promise<void>;
}
