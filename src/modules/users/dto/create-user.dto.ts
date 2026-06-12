import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Daniel Rodriguez',
  })
  @IsString()
  @Length(2, 120)
  name!: string;

  @ApiProperty({
    example: 'daniel@email.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: '+573001112233',
  })
  @IsString()
  phoneNumber!: string;

  @ApiProperty({
    example: 'Password123*',
  })
  @IsString()
  password!: string;
}
