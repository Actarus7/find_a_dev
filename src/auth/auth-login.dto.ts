import { ApiProperty } from '@nestjs/swagger';
import { Equals, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  pseudo: string;

  @ApiProperty()
  @IsString()
  password: string;
}
