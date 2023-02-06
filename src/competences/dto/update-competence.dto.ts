import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator/types/decorator/decorators';
import { CreateCompetenceDto } from './create-competence.dto';

export class UpdateCompetenceDto extends PartialType(CreateCompetenceDto) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}
