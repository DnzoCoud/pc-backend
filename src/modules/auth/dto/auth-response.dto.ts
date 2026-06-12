import { UserResponseDto } from 'src/modules/users/dto/user-response.dto';

export class AuthResponseDto {
  accessToken!: string;
  user!: UserResponseDto;
}
