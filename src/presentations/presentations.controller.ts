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
import { PresentationsService } from './presentations.service';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import { ApiTags } from '@nestjs/swagger';

/**Décorateur Tag permettant de catégoriser les différentes route dans la doc API Swagger*/
@ApiTags('Presentations')
/**Décorateur de contrôle qui récupère toutes les données de PresentationsService */
@Controller('presentations')

/**class permettant le contrôle des données entrantes pour les requêtes presentations */
export class PresentationsController {
  constructor(private readonly presentationsService: PresentationsService) {}

  /**Contrôle préalable à l'ajout d'une nouvelle présentation, tout en applicant les obligations de CreateCompetenceDto*/
  @Post()
  create(@Body() createPresentationDto: CreatePresentationDto) {
    const createdPresentation = this.presentationsService.create(createPresentationDto);
    return {
      statusCode: 201,
      message: "Création d'une présentation réussie",
      data: createdPresentation
    }
  }



  /**Contrôle préalable à la récupération de toutes les présentations */
  @Get()
  findAll() {
    const allPresentation = this.presentationsService.findAll();
    return {
      statusCode: 200,
      message: "Récupération réussie de toutes les présentations",
      data: allPresentation
    }
  }



  /**Contrôle préalable à la récupération d'une présentation grâce à son id */
  @Get(':id')
  @Bind(Param('id', new ParseIntPipe()))
  findOne(@Param('id') id: string) {
    const onePresentation = this.presentationsService.findOne(+id);
    return {
      statusCode: 200,
      message: "Récupération réussie d'une présentation"
    }
  }



  /**Contrôle préalable à la modification d'une présentation */
  @Patch(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async update(
    @Param('id') id: number,
    @Body() updatePresentationDto: UpdatePresentationDto,
  ) {
    const isPresentationExists = await this.presentationsService.findOne(id);
    if (!isPresentationExists) {
      throw new BadRequestException('Présentation non trouvée');
    }
    const updatedPresentation = this.presentationsService.update(+id, updatePresentationDto);
    return {
      statusCode: 201,
      message: 'Modifications de la présentation enregistrées',
      data: updatedPresentation
    }
  }



  /**Contrôle préalable à la suppression d'une compétence */
  @Delete(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async remove(@Param('id') id: number) {
    const isPresentationExists = await this.presentationsService.findOne(id);
    if (!isPresentationExists) {
      throw new BadRequestException('Présentation non trouvée');
    }
    const deletedPresentation = await isPresentationExists.remove();
    return{
      statusCode: 201,
      message: 'Suppression de la présentation enregistrées',
      data:  deletedPresentation
    };
  }
}
