import { Injectable } from '@nestjs/common';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import { Presentation } from './entities/presentation.entity';

/**
 * Ensemble des services pour la table Présentations:
 * 
 * * **createCompetences**  : permet de créer une présentation dans la BDD
 * * **finAll**             : permet de récupérer toutes les présentations de la BDD
 * * **findOne**            : permet de récupérer une présentation de la BDD par son id
 * * **update**             : permet de modifier une présentation de la BDD par son id
 * * **remove**             : permet de supprimer une présentation de la BDD par son id */
@Injectable()
/**Class permettant la gestion des requètes SQL pour les compétences */
export class PresentationsService {
  /**créer une présentation dans la BDD */
  async create(createPresentationDto: CreatePresentationDto | any): Promise<Presentation> {
    const newPresentation = await Presentation.save(createPresentationDto)
    return newPresentation;
  }

  /**trouver toutes les présentations dans la BDD */
  async findAll() {
    return await Presentation.find();
  }

  /**trouver une présentation dans la BDD par son id */
  async findOne(id: number): Promise<Presentation> {
    return await Presentation.findOneBy({ id });
  }

  async findOneByPresentationId(presentation: Presentation) {
    return await Presentation.findOneBy({ id: presentation.id })
  }

  /**modifier une présentation dans la BDD par son id */
  async update(id: number, updatePresentationDto: UpdatePresentationDto): Promise<Presentation> {
    const newPresentation = await Presentation.update(id, updatePresentationDto);
    if (newPresentation) {
      return await Presentation.findOneBy({ id });
    };
    return undefined;
  }

  /**supprimer une présentation dans la BDD par son id */
  async remove(id: number | any) {
    const presentation = await Presentation.remove(id);

    if (presentation) {
      return `This action removes a #${id} presentation`;
    }
    return undefined
  }
}
