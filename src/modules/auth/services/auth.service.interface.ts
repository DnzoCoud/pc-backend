import { AuthResponseDto } from '../dto/auth-response.dto';
import { LoginDto } from '../dto/login.dto';

export interface IAuthService {
  login(dto: LoginDto): Promise<AuthResponseDto>;
}
