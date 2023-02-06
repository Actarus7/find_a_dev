import { Injectable } from '@nestjs/common';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';

@Injectable()
export class CompetencesService {
  create(createCompetenceDto: CreateCompetenceDto) {
    return 'This action adds a new competence';
  }

  findAll() {
    return `This action returns all competences`;
  }

  findOne(id: number) {
    return `This action returns a #${id} competence`;
  }

  update(id: number, updateCompetenceDto: UpdateCompetenceDto) {
    return `This action updates a #${id} competence`;
  }

  remove(id: number) {
    return `This action removes a #${id} competence`;
  }
}
