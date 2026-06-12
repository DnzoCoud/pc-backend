import { UserResponseDto } from '../dto/user-response.dto';
import { UserEntity } from '../models/user.entity';

export class UserMapper {
  static toResponseDto(entity: UserEntity): UserResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      phoneNumber: entity.phoneNumber,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      role: entity.role,
    };
  }
}
