import { Inject, Injectable } from '@nestjs/common';
import { IUsersService } from './users.service.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import * as bcrypt from 'bcrypt';
import { USER_REPOSITORY } from '../users.constants';
import { type IUserRepository } from '../repositories/user.repository.interface';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists.exception';
import { UserEntity } from '../models/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { AUDIT_SERVICE } from 'src/modules/audit/audit.constants';
import { type IAuditService } from 'src/modules/audit/services/audit.service.interface';

@Injectable()
export class UserService implements IUsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: IUserRepository,

    @Inject(AUDIT_SERVICE)
    private readonly auditService: IAuditService,
  ) {}

  async updateProfile(
    userId: string,
    dto: UpdateProfileDto,
  ): Promise<UserResponseDto> {
    const user = await this.repository.findById(userId);

    if (!user) {
      throw new UserNotFoundException();
    }

    if (dto.email && dto.email !== user.email) {
      const existingUser = await this.repository.findByEmail(dto.email);

      if (existingUser) {
        throw new UserAlreadyExistsException(dto.email);
      }
    }

    user.name = dto.name ?? user.name;
    user.email = dto.email ?? user.email;
    user.phoneNumber = dto.phoneNumber ?? user.phoneNumber;

    const updatedUser = await this.repository.save(user);

    this.auditService.publish({
      userId: user.id,
      action: 'UPDATE',
      resource: 'USER',
      metadata: {
        email: user.email,
        phoneNumber: dto.phoneNumber,
        name: dto.name,
      },
    });

    return UserMapper.toResponseDto(updatedUser);
  }

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.repository.existsByEmail(dto.email);
    if (existingUser) throw new UserAlreadyExistsException(dto.email);

    const newUser = new UserEntity();

    newUser.name = dto.name;
    newUser.email = dto.email;
    newUser.phoneNumber = dto.phoneNumber;

    newUser.passwordHash = await bcrypt.hash(dto.password, 10);

    const savedUser = await this.repository.save(newUser);

    this.auditService.publish({
      userId: savedUser.id,
      action: 'CREATE',
      resource: 'USER',
      metadata: {
        email: savedUser.email,
        phoneNumber: dto.phoneNumber,
        name: dto.name,
      },
    });

    return UserMapper.toResponseDto(savedUser);
  }

  async findById(id: string): Promise<UserResponseDto> {
    const existingUser = await this.repository.findById(id);
    if (!existingUser) throw new UserNotFoundException();

    this.auditService.publish({
      userId: existingUser.id,
      action: 'FIND',
      resource: 'USER',
    });

    return UserMapper.toResponseDto(existingUser);
  }
}
