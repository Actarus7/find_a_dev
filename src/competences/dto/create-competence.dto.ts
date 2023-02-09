import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class CreateCompetenceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1)
  @Transform(({ value }) => value.toLowerCase())
  description: string;
}
