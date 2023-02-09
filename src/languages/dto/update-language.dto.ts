import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { CreateLanguageDto } from './create-language.dto';

export class UpdateLanguageDto extends PartialType(CreateLanguageDto) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1)
  @Transform(({ value }) => value.toLowerCase())
  name: string;
}
