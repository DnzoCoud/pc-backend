import { UserRole } from '../models/user-role.enum';

export class UserResponseDto {
  id!: string;
  name!: string;
  email!: string;
  phoneNumber!: string;
  createdAt!: Date;
  updatedAt!: Date;
  role!: UserRole;
}
