import { Injectable } from '@nestjs/common';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import { Presentation } from './entities/presentation.entity';

/**Décorateur qui permet d'injecter la dépendance PresentationsService responsable du stockage et de la récupération des données dans la BDD, utilisées par PresentationsController */
@Injectable()
/**Class permettant la gestion des requètes SQL pour les compétences */
export class PresentationsService
{
  /**créer une présentation dans la BDD */
  create(createPresentationDto: CreatePresentationDto | any)
  {
    const newPresentation = Presentation.save(createPresentationDto)
    return newPresentation;
  }

  /**trouver toutes les présentations dans la BDD */
  findAll()
  {
    return Presentation.find();
  }

  /**trouver une présentation dans la BDD par son id */
  findOne(id: number)
  {
    return Presentation.findOneBy({ id });
  }

  /**modifier une présentation dans la BDD par son id */
  async update(id: number, updatePresentationDto: UpdatePresentationDto)
  {
    const newPresentation = await Presentation.update(id, updatePresentationDto);
    if (newPresentation)
    {
      return await Presentation.findOneBy({ id });
    };
    return undefined;
  }

  /**supprimer une présentation dans la BDD par son id */
  async remove(id: number | any)
  {
    const presentation = await Presentation.remove(id);

    if (presentation)
    {
      return `This action removes a #${id} presentation`;
    }
    return undefined
  }
}
