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

/**décorateur Tag permettant de catégoriser les différentes route dans la doc API Swagger*/
@ApiTags('Competences')
/**décorateur de contrôle qui récupère toutes les données de CompetencesService */
@Controller('competences')

/**Class permettant le contrôle des données entrantes pour les requête competences */
export class CompetencesController {
  constructor(private readonly competencesService: CompetencesService) {}

  /**Contrôle préalable à l'ajout d'une nouvelle compétence, tout en applicant les obligations de createCompetenceDto */
  @Post()
  create(@Body() createCompetenceDto: CreateCompetenceDto) {
    return this.competencesService.createCompetences(createCompetenceDto);
  }

  /**Contrôle préalable à la récupération de toutes les compétences */
  @Get()
  findAll() {
    return this.competencesService.findAll();
  }

  /**Contrôle préalable à la récupération d'une compétence grâce à son id */
  @Get(':id')
  @Bind(Param('id', new ParseIntPipe()))
  findOne(@Param('id') id: string) {
    return this.competencesService.findOne(+id);
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

    return await this.competencesService.update(+id, updateCompetenceDto);
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

    return deletedCompetence;
  }
}
