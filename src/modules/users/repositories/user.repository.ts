import { Injectable } from '@nestjs/common';
import { UserEntity } from '../models/user.entity';
import { IUserRepository } from './user.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async save(user: UserEntity): Promise<UserEntity> {
    return this.repository.save(user);
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.repository.findOne({
      where: {
        email,
      },
    });
  }

  async update(user: UserEntity): Promise<UserEntity> {
    return this.repository.save(user);
  }
}
