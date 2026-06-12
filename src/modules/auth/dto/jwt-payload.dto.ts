import { UserRole } from 'src/modules/users/models/user-role.enum';

export interface JwtPayload {
  sub: string;
  email: string;
  jti: string;
  role: UserRole;
}
