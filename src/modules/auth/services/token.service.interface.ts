import { UserRole } from 'src/modules/users/models/user-role.enum';

export interface ITokenService {
  generateAccessToken(
    userId: string,
    email: string,
    role: UserRole,
  ): Promise<string>;
}
