import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'daniel@daniel.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'daniel123',
  })
  @IsString()
  password!: string;
}
