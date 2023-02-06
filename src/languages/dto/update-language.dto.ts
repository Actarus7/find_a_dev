import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateLanguageDto } from './create-language.dto';

export class UpdateLanguageDto extends PartialType(CreateLanguageDto) {
  @IsString()
  name: string;
}
