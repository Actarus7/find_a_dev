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
  ConflictException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PresentationsService } from './presentations.service';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


/**class permettant le contrôle des données entrantes pour les requêtes presentations */
/*Décorateur Tag permettant de catégoriser les différentes route dans la doc API Swagger*/
@ApiTags('Presentations')
/*Décorateur de contrôle qui récupère toutes les données de PresentationsService */
@Controller('presentations')
export class PresentationsController {
  constructor(private readonly presentationsService: PresentationsService) { }

  /**Contrôle préalable à l'ajout d'une nouvelle présentation, tout en applicant les obligations de CreateCompetenceDto*/
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPresentationDto: CreatePresentationDto, @Request() req) {
    const userPseudo = req.user.pseudo ;
    const exist = await this.presentationsService.findOneByUserPseudo(userPseudo)
    if (exist) throw new ConflictException("This presentation already exist")

    const createdPresentation = await this.presentationsService.create(createPresentationDto,userPseudo);

    return {
      statusCode: 201,
      message: "Création d'une présentation réussie",
      data: createdPresentation
    }
  }



  /**Contrôle préalable à la récupération de toutes les présentations */
  @Get()
  async findAll() {

    const allPresentation = await this.presentationsService.findAll();
    
    return {
      statusCode: 200,
      message: "Récupération réussie de toutes les présentations",
      data: allPresentation
    }
  }



  /**Contrôle préalable à la récupération d'une présentation grâce à son id */
  @UseGuards(JwtAuthGuard)
  @Get()
  async findOne(@Request() req) {
    const userPseudo = req.user.pseudo ;
    const onePresentation = await this.presentationsService.findOneByUserPseudo(userPseudo);
    return {
      statusCode: 200,
      message: "Récupération réussie d'une présentation",
      data: onePresentation
    }
  }



  /**Contrôle préalable à la modification d'une présentation */
  @UseGuards(JwtAuthGuard)
  @Patch()
  async update( @Body() updatePresentationDto: UpdatePresentationDto, @Request() req) {
    const userPseudo = req.user.pseudo ;
    const isPresentationExists = await this.presentationsService.findOneByUserPseudo(userPseudo);
    if (!isPresentationExists) {
      throw new BadRequestException('Présentation non trouvée');
    }
    const updatedPresentation = await this.presentationsService.update(userPseudo, updatePresentationDto);
    
    return {
      statusCode: 201,
      message: 'Modifications de la présentation enregistrées',
      data: updatedPresentation
    }
  }



  /**Contrôle préalable à la suppression d'une compétence */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async remove(@Param('id') id: number) {
    const isPresentationExists = await this.presentationsService.findOne(id);
    if (!isPresentationExists) {
      throw new BadRequestException('Présentation non trouvée');
    }
    const deletedPresentation = await isPresentationExists.remove();
    return {
      statusCode: 201,
      message: 'Suppression de la présentation enregistrées',
      data: deletedPresentation
    };
  }
}
