import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray } from 'class-validator';
import { Competence } from 'src/competences/entities/competence.entity';
import { Language } from 'src/languages/entities/language.entity';
import { Presentation } from 'src/presentations/entities/presentation.entity';

export class CreateProfileDto {
  @ApiProperty()
  @IsNumber()
  presentation: Presentation;

  @ApiProperty()
  @IsArray()
  languages: Language[];

    // @IsNumber({}, { each: true }) // ne marche plus car Array d'Objets Competence
    @ApiProperty()
    @IsArray()
    competences: Competence[];

};

