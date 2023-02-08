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
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LanguagesService } from 'src/languages/languages.service';
import { CompetencesService } from 'src/competences/competences.service';

/**décorateur Tag permettant de catégoriser les différentes route dans la doc API Swagger*/
@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly languageService: LanguagesService,
    private readonly competencesService: CompetencesService) { }


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


    // Récupère l'id du user connecté puis vérifie qu'il n'a pas déjà un profil existant
    const userIdLogged = req.user.id;

    const isUserProfileAlreadyExists = await this.profilesService.findOneByUserId(userIdLogged);

    if (isUserProfileAlreadyExists.length > 0) {
      throw new ConflictException('Vous avez déjà un profil existant');
    };


    // Vérifie que la présentation n'est pas déjà attribuée à un profil (1 profil = 1 présentation)
    const isPresentationProfileAlreadyExists = await this.profilesService.findOneByPresentationId(createProfileDto.presentation);

    if (isPresentationProfileAlreadyExists.length > 0) {
      throw new ConflictException('Cette présentation est déjà affectée à un autre profil');
    };


    // Vérifie que les langages à ajouter existent
    const allLanguages = await this.languageService.findAll();
    const arrayAllLanguages = allLanguages.map((elm) => elm.id);

    createProfileDto.languages.forEach(language => {
      if (!arrayAllLanguages.includes(language.id)) {
        throw new BadRequestException("Un des langages que vous essayez d'ajouter n'existe pas");
      };
    });


    // Vérifie que les compétences à ajouter existent
    const allCompetences = await this.competencesService.findAll();
    const arrayAllCompetences = allCompetences.map((elm) => elm.id);

    createProfileDto.competences.forEach(competence => {
      if (!arrayAllCompetences.includes(competence.id)) {
        throw new BadRequestException("Une des compétences que vous essayez d'ajouter n'existe pas");
      };
    });


    // Création du nouveau profil
    const newProfile = await this.profilesService.create(createProfileDto, userIdLogged);

    return newProfile;
  };


  /** Récupèration de tous les profils */
  @Get()
  async findAll() {

    const profiles = await this.profilesService.findAll();

    if (profiles.length < 0) {
      throw new BadRequestException("Il n'y a aucun profil à afficher")
    };

    return profiles;
  };


  /** Récupération d'un profil par son id */
  @Get(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async findOne(@Param('id') id: number) {
    const profile = await this.profilesService.findOne(+id);


    if (profile.length < 0) {
      throw new BadRequestException('Aucun profil à afficher');
    };

    return profile;
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


    // Vérifie que les langages à ajouter existent
    if (updateProfileDto.languages) {
      const allLanguages = await this.languageService.findAll();
      const arrayAllLanguages = allLanguages.map((elm) => elm.id);

      updateProfileDto.languages.forEach(language => {
        if (!arrayAllLanguages.includes(language.id)) {
          throw new BadRequestException("Un des langages que vous essayez d'ajouter n'existe pas");
        };
      });
    };


    // Vérifie que les compétences à ajouter existent
    if (updateProfileDto.competences) {
      const allCompetences = await this.competencesService.findAll();
      const arrayAllCompetences = allCompetences.map((elm) => elm.id);

      updateProfileDto.competences.forEach(competence => {
        if (!arrayAllCompetences.includes(competence.id)) {
          throw new BadRequestException("Une des compétences que vous essayez d'ajouter n'existe pas");
        };
      });
    };


    // Modifie le profil
    const updatedProfile = await this.profilesService.update(+id, updateProfileDto);

    return updatedProfile;
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

    return deletedProfile;
  };
};
