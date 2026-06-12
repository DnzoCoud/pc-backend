import { UserEntity } from '../models/user.entity';

export interface IUserRepository {
  save(user: UserEntity): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findByEmailWithPassword(email: string): Promise<UserEntity | null>;
  update(user: UserEntity): Promise<UserEntity>;
  existsByEmail(email: string): Promise<boolean>;
}
