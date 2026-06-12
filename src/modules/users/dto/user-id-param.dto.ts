import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UserIdParamsDto {
  @ApiProperty({
    example: '123123-dfasdasd',
  })
  @IsUUID('4')
  id!: string;
}
