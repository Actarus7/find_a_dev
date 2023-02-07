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
    return this.presentationsService.create(createPresentationDto);
  }

  /**Contrôle préalable à la récupération de toutes les présentations */
  @Get()
  findAll() {
    return this.presentationsService.findAll();
  }

  /**Contrôle préalable à la récupération d'une présentation grâce à son id */
  @Get(':id')
  @Bind(Param('id', new ParseIntPipe()))
  findOne(@Param('id') id: string) {
    return this.presentationsService.findOne(+id);
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
    return this.presentationsService.update(+id, updatePresentationDto);
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
    return deletedPresentation;
  }
}
