import { Injectable } from '@nestjs/common';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';
import { Competence } from './entities/competence.entity';

@Injectable()
export class CompetencesService {
  
  createCompetences(createCompetenceDto: CreateCompetenceDto | any) {
    const newCompetence = Competence.save(createCompetenceDto);
    return newCompetence;
  }

  findAll() {
    return Competence.find();
  }

  findOne(id: number) {
    return Competence.findOneBy({id})
  }

  update(id: number, updateCompetenceDto: UpdateCompetenceDto) {
    return `This action updates a #${id} competence`;
  }

  remove(id: number) {
    return `This action removes a #${id} competence`;
  }
}
