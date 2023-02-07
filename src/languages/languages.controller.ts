import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Bind, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) { }


  /** Création d'un nouveau langage */
  @Post()
  async create(@Body() createLanguageDto: CreateLanguageDto) {

    const newLanguage = await this.languagesService.create(createLanguageDto);

    return newLanguage;
  };


  /** Récupération de tous les langages */
  @Get()
  async findAll() {

    const languages = await this.languagesService.findAll();

    return languages;
  };


  /** Récupération d'un langage par son id */
  @Get(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async findOne(@Param('id') id: number) {

    const language = await this.languagesService.findOne(+id);

    return language;
  };


  /** Modification d'un langage */
  @Patch(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async update(@Param('id') id: number, @Body() updateLanguageDto: UpdateLanguageDto) {

    // Vérifie si le langage à modifier existe
    const isLanguageExists = await this.languagesService.findOne(id);

    if (!isLanguageExists) {
      throw new BadRequestException('Language id unknown');
    };

    // Modifie le langage concerné
    return this.languagesService.update(+id, updateLanguageDto);
  };


  /** Supprimer un langage */
  @Delete(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async remove(@Param('id') id: number) {
    const isLanguageExists = await this.languagesService.findOne(id);

    if (!isLanguageExists) {
      throw new BadRequestException('Language id unknown');
    };

    // Supprime le langage concerné
    return this.languagesService.remove(+id);
  };
  
};