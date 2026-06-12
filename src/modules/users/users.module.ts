import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { UserRepository } from './repositories/user.repository';
import { USER_REPOSITORY, USER_SERVICE } from './users.constants';
import { UserService } from './services/users.service';
import { UserController } from './controller/user.controller';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuditModule],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
  ],
  controllers: [UserController],
  exports: [USER_REPOSITORY, USER_SERVICE],
})
export class UsersModule {}
