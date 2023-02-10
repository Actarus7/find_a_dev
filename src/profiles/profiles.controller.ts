import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Bind,
  ParseIntPipe,
  BadRequestException,
  UseGuards,
  Request,
  ForbiddenException,
  ConflictException,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LanguagesService } from 'src/languages/languages.service';
import { CompetencesService } from 'src/competences/competences.service';
import { PresentationsService } from 'src/presentations/presentations.service';
import { Presentation } from 'src/presentations/entities/presentation.entity';
import { UsersService } from 'src/users/users.service';

/**décorateur Tag permettant de catégoriser les différentes route dans la doc API Swagger*/
@ApiTags('Profiles')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('profiles')
export class ProfilesController {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly languagesService: LanguagesService,
    private readonly competencesService: CompetencesService,
    private readonly presentationsService: PresentationsService,
    private readonly usersService: UsersService) { }


  /** Création d'un nouveau profil   
   * Nécessite : 
   * * d'être enregistré et connecté
   * * que le user connecté n'ait pas déjà un profil existant
   * * que les langages existent
   * * que les compétences existent
   * * que le présentation existe et ne soit pas déjà liée à un autre profil
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createProfileDto: CreateProfileDto, @Request() req) {


    // Vérifie que la présentation existe
    const isPresentationExists = await this.presentationsService.findOneByPresentationId(createProfileDto.presentation);

    if (!isPresentationExists) {
      throw new BadRequestException("Cette présentation n'existe pas");
    };



    // Vérifie que languages[] n'est pas un array vide
    if (createProfileDto.languages.length < 1) {
      throw new BadRequestException('Languages est vide');
    };

    // Vérifie que le type de données attendu dans langages est correct
    createProfileDto.languages.forEach(elm => {
      if (typeof (elm) != 'string') {
        throw new BadRequestException("Le type de données dans langages est incorrect - Attendu 'string'");
      };
    });

    // Vérifie que les langages à ajouter existent
    const arrayAllLanguages = (await this.languagesService.findAll()).map((elm) => elm.name);

    createProfileDto.languages.forEach(language => {
      if (!arrayAllLanguages.includes(language)) {
        // Création du langage inexistant
        throw new NotFoundException("Le langage que vous tentez d'ajouter à votre profil n'existe pas")
        // const newLanguage = await this.languagesService.create({ name: language.toLowerCase() });

      };
    });

    // Modification du format d'envoi de langages
    let languages = []
    createProfileDto.languages.forEach(async language => {

      languages.push({ id: ((await this.languagesService.findOneByName(language.toLowerCase())).id) });
    });
    createProfileDto.languages = languages;




    // Vérifie que competences[] n'est pas un array vide
    if (createProfileDto.competences.length < 1) {
      throw new BadRequestException('Compétences est vide');
    };

    // Vérifie que le type de données attendu dans compétences est correct
    createProfileDto.competences.forEach(elm => {
      if (typeof (elm) != 'string') {
        throw new BadRequestException("Le type de données dans compétences est incorrect - Attendu 'string'");
      };
    });

    // Vérifie que les compétences à ajouter existent
    const arrayAllCompetences = (await this.competencesService.findAll()).map((elm) => elm.description);

    createProfileDto.competences.forEach(competence => {
      if (!arrayAllCompetences.includes(competence)) {
        throw new NotFoundException("La compétence que vous tentez d'ajouter à votre profil n'existe pas")
      };
    });

    // Modification du format d'envoi de competences
    let competences = []
    createProfileDto.competences.forEach(async description => {
      competences.push({ id: ((await this.competencesService.findOneByDescription(description.toLowerCase())).id) })
    });
    createProfileDto.competences = competences;




    // Récupère l'id du user connecté puis vérifie qu'il n'a pas déjà un profil existant
    const userIdLogged = req.user.id;

    const isUserProfileAlreadyExists = await this.profilesService.findOneByUserId(userIdLogged);

    if (isUserProfileAlreadyExists.length > 0) {
      throw new ConflictException('Vous avez déjà un profil existant');
    };


    // Récupère le user connecté
    const userLogged = await this.usersService.findOneById(userIdLogged);




    // Vérifie que la présentation n'est pas déjà attribuée à un profil (1 profil = 1 présentation)
    const isPresentationProfileAlreadyExists = await this.profilesService.findOneByPresentationId(createProfileDto.presentation);

    if (isPresentationProfileAlreadyExists.length > 0) {
      throw new ConflictException('Cette présentation est déjà affectée à un autre profil');
    };




    // Création du nouveau profil
    const newProfile = await this.profilesService.create(createProfileDto, userLogged);

    return {
      statusCode: 201,
      message: 'Profil créé',
      data: {
        newProfile,
      },
    };
  };


  /** Récupèration de tous les profils */
  @Get()
  async findAll() {

    const profiles = await this.profilesService.findAll();

    if (profiles.length < 1) {
      throw new BadRequestException("Il n'y a aucun profil à afficher")
    };

    return {
      statusCode: 200,
      message: 'Profils disponibles',
      data: {
        profiles,
      },
    };
  };


  /** Récupération d'un profil par son id */
  @Get(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async findOne(@Param('id') id: number) {
    const profile = await this.profilesService.findOne(+id);


    if (profile.length < 1) {
      throw new BadRequestException('Aucun profil à afficher');
    };

    return {
      statusCode: 200,
      message: 'Profil disponible',
      data: {
        profile,
      },
    };
  };


  /** Modification d'un profil    
   * Nécessite :
   * * que le profil à modifier existe
   * * d'être enregistré et connecté
   * * que le user connecté soit le propriétaire du profil
   * * que les langages à ajouter existent
   * * que les compétences à ajouter existent
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async update(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto, @Request() req) {

    // Vérifie qu'il y ait bien des données envoyées
    if (!updateProfileDto.competences && !updateProfileDto.languages) {
      throw new BadRequestException("Il n'y a aucune donnée à modifier, vérifiez votre envoi");
    };



    // Vérifie que le profil id existe
    const isProfileExists = await this.profilesService.findOne(id);

    if (isProfileExists.length < 1) {
      throw new BadRequestException("Ce profil id n'existe pas");
    };




    // Vérifie que le user connecté est propriétaire du profil
    const userIdLogged = req.user.id;

    if (userIdLogged !== isProfileExists[0].user.id) {
      throw new ForbiddenException("Vous n'avez pas accès à ce profil");
    };




    // Vérification des données SI modifications des langages
    if (updateProfileDto.languages) {
      // Vérifie que languages[] n'est pas un array vide    
      if (updateProfileDto.languages.length < 1) {
        throw new BadRequestException('Languages est vide');
      };

      // Vérifie que le type de données attendu dans langages est correct
      updateProfileDto.languages.forEach(elm => {
        if (typeof (elm) != 'string') {
          throw new BadRequestException("Le type de données dans langages est incorrect - Attendu 'string'");
        };
      });

      // Vérifie que les langages à ajouter existent
      const allLanguages = await this.languagesService.findAll();
      const arrayAllLanguages = allLanguages.map((elm) => elm.name);

      updateProfileDto.languages.forEach(language => {
        if (!arrayAllLanguages.includes(language.toLowerCase())) {
          // Création du langage inexistant
          throw new NotFoundException("Le langage que vous tentez d'ajouter à votre profil n'existe pas")
          // const newLanguage = await this.languagesService.create({ name: language.toLowerCase() });

        };
      });

      // Modification du format d'envoi de langages
      let languages = []
      updateProfileDto.languages.forEach(async language => {

        languages.push({ id: ((await this.languagesService.findOneByName(language.toLowerCase())).id) });
      });
      updateProfileDto.languages = languages;

    };





    // Vérification des données SI modifications des compétences
    if (updateProfileDto.competences) {

      // Vérifie que competences[] n'est pas un array vide
      if (updateProfileDto.competences.length < 1) {
        throw new BadRequestException('Compétences est vide');
      };

      // Vérifie que le type de données attendu dans compétences est correct
      updateProfileDto.competences.forEach(elm => {
        if (typeof (elm) != 'string') {
          throw new BadRequestException("Le type de données dans compétences est incorrect - Attendu 'string'");
        };
      });

      // Vérifie que les compétences à ajouter existent
      const allCompetences = await this.competencesService.findAll();
      const arrayAllCompetences = allCompetences.map((elm) => elm.description);

      updateProfileDto.competences.forEach(competence => {
        if (!arrayAllCompetences.includes(competence.toLowerCase())) {
          throw new NotFoundException("La compétence que vous tentez d'ajouter à votre profil n'existe pas")
        };
      });

      // Modification du format d'envoi de compétences
      let competences = []
      updateProfileDto.competences.forEach(async description => {
        competences.push({ id: ((await this.competencesService.findOneByDescription(description.toLowerCase())).id) })
      });
      updateProfileDto.competences = competences;
    };



    // Modifie le profil
    const updatedProfile = await this.profilesService.update(+id, updateProfileDto);

    return {
      statusCode: 201,
      message: 'Profil modifié',
      data: {
        updatedProfile,
      },
    };
  };


  /** Suppression d'un profil    
   * Nécessite :
   * * que le profil existe
   * * d'être enregistré et connecté
   * * que le user connecté soit le propriétaire du profil
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async remove(@Param('id') id: number, @Request() req) {


    // Vérifie si le profil sélectionné existe
    const isProfileExists = await this.profilesService.findOne(id);

    if (isProfileExists.length < 1) {
      throw new BadRequestException("Ce profil n'existe pas")
    };


    // Vérifie que le user connecté est propriétaire du profil
    const userIdLogged = req.user.id;

    if (userIdLogged !== isProfileExists[0].user.id) {
      throw new ForbiddenException("Vous n'avez pas accès à ce profil");
    };


    // Supprime le profil sélectionné
    const deletedProfile = await this.profilesService.remove(id);

    return {
      statusCode: 200,
      message: 'Profil supprimé',
      data: {
        deletedProfile,
      },
    };;
  };
};
