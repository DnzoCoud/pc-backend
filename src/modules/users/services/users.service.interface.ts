import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { UserResponseDto } from '../dto/user-response.dto';

export interface IUsersService {
  create(dto: CreateUserDto): Promise<UserResponseDto>;
  findById(id: string): Promise<UserResponseDto>;
  updateProfile(
    userId: string,
    dto: UpdateProfileDto,
  ): Promise<UserResponseDto>;
}
