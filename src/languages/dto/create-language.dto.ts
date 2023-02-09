import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateLanguageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1)
  @Transform(({ value }) => value.toLowerCase())
  name: string;
}
