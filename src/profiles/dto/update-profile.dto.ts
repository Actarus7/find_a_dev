import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsArray } from 'class-validator';
import { Competence } from 'src/competences/entities/competence.entity';
import { Language } from 'src/languages/entities/language.entity';
import { Presentation } from 'src/presentations/entities/presentation.entity';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {

  @ApiProperty()
  @IsArray()
  languages?: Language[];

  @ApiProperty()
  @IsArray()
  competences?: Competence[];

};
