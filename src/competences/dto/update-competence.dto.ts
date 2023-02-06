import { PartialType } from '@nestjs/swagger';
import { CreateCompetenceDto } from './create-competence.dto';

export class UpdateCompetenceDto extends PartialType(CreateCompetenceDto) {}
