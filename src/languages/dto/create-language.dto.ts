import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLanguageDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

};
