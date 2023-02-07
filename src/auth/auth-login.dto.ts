import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  pseudo: string;

  @ApiProperty()
  @IsString()
  password: string;
}
