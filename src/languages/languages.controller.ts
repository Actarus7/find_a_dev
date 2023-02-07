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
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async update(
    @Param('id') id: number,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ) {


    // Vérifie si le langage à modifier existe
    const isLanguageExists = await this.languagesService.findOne(id);

    if (!isLanguageExists) {
      throw new BadRequestException('Language id unknown');
    }

    // Modifie le langage concerné
    return this.languagesService.update(+id, updateLanguageDto);
  };


  /** Supprimer un langage */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async remove(@Param('id') id: number) {
    const isLanguageExists = await this.languagesService.findOne(id);

    if (!isLanguageExists) {
      throw new BadRequestException('Language id unknown');
    }

    // Supprime le langage concerné
    return this.languagesService.remove(+id);
  };

};
