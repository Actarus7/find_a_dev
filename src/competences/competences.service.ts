import { Injectable } from '@nestjs/common';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';
import { Competence } from './entities/competence.entity';

@Injectable()
export class CompetencesService
{

  createCompetences(createCompetenceDto: CreateCompetenceDto | any)
  {
    const newCompetence = Competence.save(createCompetenceDto);
    return newCompetence;
  }


  findAll()
  {
    return Competence.find();
  }

  findOne(id: number)
  {
    return Competence.findOneBy({ id })
  }



  async update(id: number, updateCompetenceDto: UpdateCompetenceDto | any)
  {

    const newCompetence = await Competence.update(id, updateCompetenceDto);

    if (newCompetence)
    {
      return await Competence.findOneBy({ id });
    };

    return undefined;
  };


  async remove(id: number | any)
  {
    const competence = await Competence.remove(id);
    
    if (competence)
    {
      return `This action removes a #${id} competence`;
    }
  }
}
