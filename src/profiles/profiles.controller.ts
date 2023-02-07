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
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiTags } from '@nestjs/swagger';

/**décorateur Tag permettant de catégoriser les différentes route dans la doc API Swagger*/
@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) { }

  /** Création d'un nouveau profil   
   * Nécessite : 
   * * d'être enregistré et connecté
   * * que le user connecté n'ait pas déjà un profil existant
   * * que les langages existent
   * * que les compétences existent
   * * que le présentation existe et ne soit pas déjà liée à un autre profil
   */
  @Post()
  async create(@Body() createProfileDto: CreateProfileDto) {

    // Vérifie que la présentation n'est pas déjà attribuée à un profil (1 profil = 1 présentation)
    // Faire une findOne Profil par présentation id ...


    const newProfile = await this.profilesService.create(createProfileDto);

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
  async findOne(@Param('id') id: string) {
    const profile = await this.profilesService.findOne(+id);


    if (profile.length < 0) {
      throw new BadRequestException('Aucun profil à afficher');
    };

    return profile;
  }


  /** Modification d'un profil    
   * Nécessite :
   * * d'être enregistré et connecté
   * * que le user connecté soit le propriétaire du profil
   * * que les langages à ajouter existent
   * * que les compétences à ajouter existent
   */
  @Patch(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async update(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto) {

    const updatedProfile = await this.profilesService.update(+id, updateProfileDto);

    return updatedProfile;
  };

  /** Suppression d'un profil */
  @Delete(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async remove(@Param('id') id: number) {

    // Vérifie si le profil sélectionné existe
    const isProfileExists = await this.profilesService.findOne(id);

    if (isProfileExists.length < 1) {
      throw new BadRequestException("Ce profil n'existe pas")
    };


    // Supprime le profil sélectionné
    const deletedProfile = await this.profilesService.remove(id);

    return deletedProfile;
  };
};
