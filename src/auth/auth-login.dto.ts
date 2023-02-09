import { ApiProperty } from '@nestjs/swagger';
import { Equals, IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @Length(1)
  pseudo: string;

  @ApiProperty()
  @IsString()
  @Length(1)
  password: string;
}
