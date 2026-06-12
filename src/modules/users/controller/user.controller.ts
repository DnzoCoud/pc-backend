import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Auth, AuthAdmin } from 'src/modules/common/decorators/auth.decorator';
import {
  type AuthenticatedUser,
  CurrentUser,
} from 'src/modules/common/decorators/current-user.decorator';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { UserResponseDto } from '../dto/user-response.dto';
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

  @Auth()
  @Get('/profile/me')
  @ApiOperation({
    summary: 'Return my profile',
  })
  findMyProfile(
    @CurrentUser()
    user: AuthenticatedUser,
  ) {
    return this.userService.findById(user.id);
  }

  @AuthAdmin()
  @Patch('/profile/me')
  @ApiOperation({
    summary: 'Update my profile',
  })
  @ApiResponse({
    status: 200,
    type: UserResponseDto,
  })
  updateProfile(
    @CurrentUser()
    user: AuthenticatedUser,

    @Body()
    dto: UpdateProfileDto,
  ) {
    return this.userService.updateProfile(user.id, dto);
  }
}
