import { Injectable } from '@nestjs/common';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';
import { Competence } from './entities/competence.entity';

/**
 * Ensemble des services pour la table Competences:
 * 
 * * **createCompetences**  : permet de créer une compétence dans la BDD
 * * **finAll**             : permet de récupérer toutes les compétences de la BDD
 * * **findOne**            : permet de récupérer une compétence de la BDD par son id
 * * **update**             : permet de modifier une compétence de la BDD par son id
 * * **remove**             : permet de supprimer une compétence de la BDD par son id
 */
@Injectable()
/**Class permettant la gestion des requètes SQL pour les compétences */
export class CompetencesService
{

  /**créer une compétence dans la BDD */
  createCompetences(createCompetenceDto: CreateCompetenceDto | any)
  {
    const newCompetence = Competence.save(createCompetenceDto);
    return newCompetence;
  }

  /**récupérer toutes les compétences de la BDD */
  findAll()
  {
    return Competence.find();
  }

  /**récupérer une compétence de la BDD par son id  */
  findOne(id: number)
  {
    return Competence.findOneBy({ id })
  }


  /**modifier une compétence de la BDD par son id */
  async update(id: number, updateCompetenceDto: UpdateCompetenceDto | any)
  {

    const newCompetence = await Competence.update(id, updateCompetenceDto);

    if (newCompetence)
    {
      return await Competence.findOneBy({ id });
    };

    return undefined;
  };

  /**supprimer une compétence de la BDD par son id */
  async remove(id: number | any)
  {
    const competence = await Competence.remove(id);

    if (competence)
    {
      return `This action removes a #${id} competence`;
    };
    return undefined;
  }
}
