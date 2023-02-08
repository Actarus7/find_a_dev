import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { Bind } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { CompetencesService } from './competences.service';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';


/**Class permettant le contrôle des données entrantes pour les requête competences */
//décorateur Tag permettant de catégoriser les différentes route dans la doc API Swagger
@ApiTags('Competences')
//décorateur de contrôle qui récupère toutes les données de CompetencesService
@Controller('competences')
export class CompetencesController {
  constructor(private readonly competencesService: CompetencesService) {}



  /**Contrôle préalable à l'ajout d'une nouvelle compétence, tout en applicant les obligations de createCompetenceDto */
  @Post()
  create(@Body() createCompetenceDto: CreateCompetenceDto) {
    const createdCompetences = this.competencesService.createCompetences(createCompetenceDto);
    return {
      statusCode: 201,
      message: "Création d'une compétence réussie",
      data: createdCompetences
    }
  }



  /**Contrôle préalable à la récupération de toutes les compétences */
  @Get()
  async findAll() {
    const allCompetences = await this.competencesService.findAll();
    return {
      statusCode: 200,
      message: "Récupération de toutes les compétences réussie",
      data: allCompetences
    }
  }



  /**Contrôle préalable à la récupération d'une compétence grâce à son id */
  @Get(':id')
  @Bind(Param('id', new ParseIntPipe()))
  findOne(@Param('id') id: string) {
    const oneCompetence = this.competencesService.findOne(+id);
    return {
      statusCode: 200,
      message: "Récupération d'une compétence réussie",
      data: oneCompetence
    }
  }



  /**Contrôle préalable à la modification d'une compétence */
  @Patch(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async update(
    @Param('id') id: number,
    @Body() updateCompetenceDto: UpdateCompetenceDto,
  ) {
    const isCompetenceExists = await this.competencesService.findOne(id);

    if (!isCompetenceExists) {
      throw new BadRequestException('Compétence non trouvée');
    }
    const updatedCompetences = await this.competencesService.update(+id, updateCompetenceDto);
    return {
      statusCode: 201,
      message: 'Modifications de la présentation enregistrées',
      data: updatedCompetences
    }
  }

  /**Contrôle préalable à la suppression d'une compétence */
  @Delete(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async remove(@Param('id') id: number) {
    const isCompetenceExists = await this.competencesService.findOne(id);

    if (!isCompetenceExists) {
      throw new BadRequestException('Compétence non trouvée');
    }
    const deletedCompetence = await isCompetenceExists.remove();

    return {
      statusCode: 201,
      message: 'Suppression de la compétence enregistrées',
      data:  deletedCompetence
    };
  }
}
