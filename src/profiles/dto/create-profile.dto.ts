import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsArray } from 'class-validator';
import { Competence } from 'src/competences/entities/competence.entity';
import { Language } from 'src/languages/entities/language.entity';
import { Presentation } from 'src/presentations/entities/presentation.entity';

export class CreateProfileDto {
  @ApiProperty()
  presentation: Presentation;

  @ApiProperty()
  @IsArray()
  @Transform(obj => obj.value.map(elm => { return { name: elm.toLowerCase() } }))
  languages: Language[];

  @ApiProperty()
  @IsArray()
  @Transform(obj => obj.value.map(elm => { return { description: elm.toLowerCase() } }))
  competences: Competence[];

}; 