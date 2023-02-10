import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';
import { Competence } from 'src/competences/entities/competence.entity';
import { Language } from 'src/languages/entities/language.entity';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @Transform(obj => obj.value.map(elm => { return { name: elm.toLowerCase() } }))
  languages?: Language[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @Transform(obj => obj.value.map(elm => { return { description: elm.toLowerCase() } }))
  competences?: Competence[];

};
