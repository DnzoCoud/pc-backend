import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { Auth } from 'src/modules/common/decorators/auth.decorator';
import { CreateUserDto } from '../dto/create-user.dto';
import { type IUsersService } from '../services/users.service.interface';
import { USER_SERVICE } from '../users.constants';

@Controller('/users')
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

  @Auth()
  @Get(':id')
  findById(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return this.userService.findById(id);
  }
}
