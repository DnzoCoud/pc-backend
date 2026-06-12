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

@Injectable()
export class UserService implements IUsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: IUserRepository,
  ) {}

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.repository.existsByEmail(dto.email);
    if (existingUser) throw new UserAlreadyExistsException(dto.email);

    const newUser = new UserEntity();

    newUser.name = dto.name;
    newUser.email = dto.email;
    newUser.phoneNumber = dto.phoneNumber;

    newUser.passwordHash = await bcrypt.hash(dto.password, 10);

    const savedUser = await this.repository.save(newUser);
    return UserMapper.toResponseDto(savedUser);
  }

  async findById(id: string): Promise<UserResponseDto> {
    const existingUser = await this.repository.findById(id);
    if (!existingUser) throw new UserNotFoundException();

    return UserMapper.toResponseDto(existingUser);
  }
}
