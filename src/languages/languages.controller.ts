import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Bind,
  ParseIntPipe,
  BadRequestException,
  UseGuards,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

/**décorateur Tag permettant de catégoriser les différentes route dans la doc API Swagger*/
@ApiTags('Languages')
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) { }


  /** Création d'un nouveau langage */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createLanguageDto: CreateLanguageDto) {


    // Vérifie que le langage à créer n'existe pas déjà
    const isLanguageExists = await this.languagesService.findOneByName(createLanguageDto.name);

    if (isLanguageExists) {
      throw new ConflictException('Ce langage existe déjà');
    };


    // Création du nouveau langage
    const newLanguage = await this.languagesService.create(createLanguageDto);

    return {
      statusCode: 201,
      message: "Création d'un nouveau langage réussie",
      data: newLanguage
    };
  };


  /** Récupération de tous les langages */
  @Get()
  async findAll() {

    // Vérifie qu'il y a des langages à afficher
    const languages = await this.languagesService.findAll();

    if (languages.length < 1) {
      throw new NotFoundException('Aucun langage à afficher');
    };

    // Retourne tous les langages
    return {
      statusCode: 200,
      message: "Affichage de tous les langages",
      data: languages
    };
  };


  /** Récupération d'un langage par son id */
  @Get(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async findOne(@Param('id') id: number) {

    // Vérifie que le langage sélectionné existe
    const language = await this.languagesService.findOne(+id);

    if (!language) {
      throw new NotFoundException("Ce langage n'existe pas");
    };

    return {
      statusCode: 200,
      message: "Affichage du langage sélectionné",
      data: language
    };
  };


  /** Modification d'un langage */
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async update(
    @Param('id') id: number,
    @Body() updateLanguageDto: CreateLanguageDto,
  ) {


    // Vérifie si le langage à modifier existe
    const isLanguageExistsById = await this.languagesService.findOne(id);

    if (!isLanguageExistsById) {
      throw new BadRequestException('Language id unknown');
    };


    // Vérifie que le langage modifié n'existe pas déjà
    const isLanguageExistsByName = await this.languagesService.findOneByName(updateLanguageDto.name);

    if (isLanguageExistsById) {
      throw new ConflictException('Ce langage existe déjà');
    };


    // Modifie le langage concerné
    const updatedLanguage = this.languagesService.update(+id, updateLanguageDto);
    return {
      statusCode: 201,
      message: 'Modifications enregistrées',
      data: updatedLanguage
    };
  };

  
  /** Supprimer un langage */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async remove(@Param('id') id: number) {

    // Vérifie que le langage à supprimer existe
    const isLanguageExists = await this.languagesService.findOne(id);

    if (!isLanguageExists) {
      throw new BadRequestException('Language id unknown');
    }

    // Supprime le langage concerné
    const deletedLanguage = this.languagesService.remove(+id);

    return {
      statusCode: 201,
      message: 'Suppression du langage sélectionné',
      data: deletedLanguage,
    };
  };

};
