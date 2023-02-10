import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class ToMeCompetenceDto {
  @ApiProperty()
  @IsArray()
  @Transform(obj  => obj.value.map((item : string) => item.toLowerCase()))
  competences: string [];
}
