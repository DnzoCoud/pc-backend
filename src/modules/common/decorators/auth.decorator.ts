import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from './roles.decorator';
import { UserRole } from 'src/modules/users/models/user-role.enum';

export function Auth() {
  return applyDecorators(UseGuards(JwtAuthGuard), ApiBearerAuth());
}

export function AuthAdmin() {
  return applyDecorators(
    UseGuards(JwtAuthGuard, RoleGuard),
    ApiBearerAuth(),
    Roles(UserRole.ADMIN),
  );
}
