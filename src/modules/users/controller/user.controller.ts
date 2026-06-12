import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { type IUsersService } from '../services/users.service.interface';
import { USER_SERVICE } from '../users.constants';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: IUsersService,
  ) {}

  @Post()
  create(
    @Body()
    dto: CreateUserDto,
  ) {
    return this.userService.create(dto);
  }

  @Get(':id')
  findById(
    @Param('id')
    id: string,
  ) {
    return this.userService.findById(id);
  }
}
