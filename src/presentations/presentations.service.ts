import { Injectable } from '@nestjs/common';
import { profile } from 'console';
import { Profile } from 'src/profiles/entities/profile.entity';
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
export class PresentationsService
{
  /**créer une présentation dans la BDD */
  async create(createPresentationDto: CreatePresentationDto , userPseudo : string) : Promise<Presentation>
  {
    console.log(userPseudo);
    
    const profile = await Profile.findOneBy({ user : {pseudo : userPseudo }})
    const newPresentation = new Presentation()
    newPresentation.description = createPresentationDto.description ;
    await newPresentation.save() ;
    profile.presentation = newPresentation
    await profile.save() ;
    return newPresentation;
  }

  /**trouver toutes les présentations dans la BDD */
  async findAll()
  {
    return await Presentation.find();
  }

  /**trouver une présentation dans la BDD par son id */
  async findOne(id: number) : Promise<Presentation>
  {
    return await Presentation.findOneBy({ id });
  }

  /**trouver une présentation dans la BDD par son id */
  async findOneByUserPseudo(userPseudo : string) : Promise<Presentation>
  {
    
    return await Presentation.findOneBy({ profile : {user : {pseudo : userPseudo}} });
  }

  /**modifier une présentation dans la BDD par son id */
  async update(userPseudo: string, updatePresentationDto: UpdatePresentationDto) : Promise<Presentation>
  {
    const newPresentation = await Presentation.findOneBy({ profile : {user : {pseudo : userPseudo}} });
    if (newPresentation)
    {
      newPresentation.description = updatePresentationDto.description ;
      await newPresentation.save()
      return await Presentation.findOneBy({ profile : {user : {pseudo : userPseudo}} });
    };
    return undefined;
  }

  /**supprimer une présentation dans la BDD par son id */
  async remove(userPseudo: string)
  {
    const presentation = await Presentation.findOne({
      where : { profile : {user : {pseudo : userPseudo}} },
      relations : { profile : true}
    });
    presentation.profile.presentation = null
    
    if (presentation)
    {
      presentation.profile.presentation = null ;
      presentation.profile.save() ;
      return await presentation.remove() ;
    }
    return undefined
  }
}
