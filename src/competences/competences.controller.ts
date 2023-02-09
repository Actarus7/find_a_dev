import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  ParseIntPipe,
  ConflictException,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { Bind, UseGuards } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CompetencesService } from './competences.service';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { ToMeCompetenceDto } from './dto/toMe-competence.dto';

/**Class permettant le contrôle des données entrantes pour les requête competences */
//décorateur Tag permettant de catégoriser les différentes route dans la doc API Swagger
@ApiTags('Competences')
//décorateur de contrôle qui récupère toutes les données de CompetencesService
@Controller('competences')
export class CompetencesController {
  constructor(private readonly competencesService: CompetencesService) {}

  /**Contrôle préalable à l'ajout d'une nouvelle compétence, tout en applicant les obligations de createCompetenceDto */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCompetenceDto: CreateCompetenceDto) {
    // Verification des Doublons
    const description = createCompetenceDto.description;
    const isCompetencesExists =
      await this.competencesService.findOneByDescription(description);

    if (isCompetencesExists) {
      throw new ConflictException('La compétence existe déjà');
    }

    const createdCompetences = await this.competencesService.createCompetences(
      createCompetenceDto,
    );

    return {
      statusCode: 201,
      message: "Création d'une compétence réussie",
      data: createdCompetences,
    };
  }

  /**Contrôle préalable à la récupération de toutes les compétences */
  @Get()
  async findAll() {
    const allCompetences = await this.competencesService.findAll();
    return {
      statusCode: 200,
      message: 'Récupération de toutes les compétences réussie',
      data: allCompetences,
    };
  }

  /**Contrôle préalable à la récupération d'une compétence grâce à son id */
  @Get(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async findOne(@Param('id') id: string) {
    const oneCompetence = await this.competencesService.findOne(+id);
    if (!oneCompetence) {
      throw new NotFoundException("La compétence n'existe pas");
    }
    return {
      statusCode: 200,
      message: "Récupération d'une compétence réussie",
      data: oneCompetence,
    };
  }

  /**Contrôle préalable à la modification d'une compétence */
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async update(
    @Param('id') id: number,
    @Body() updateCompetenceDto: CreateCompetenceDto,
  ) {
    const isCompetenceExists = await this.competencesService.findOne(id);

    if (!isCompetenceExists) {
      throw new BadRequestException('Compétence non trouvée');
    }

    const isCompetencesExists =
      await this.competencesService.findOneByDescription(
        updateCompetenceDto.description,
      );

    if (isCompetencesExists) {
      throw new ConflictException('La compétence existe déjà');
    }

    const updatedCompetences = await this.competencesService.update(
      +id,
      updateCompetenceDto,
    );
    return {
      statusCode: 201,
      message: 'Modifications de la présentation enregistrées',
      data: updatedCompetences,
    };
  }

  /**Contrôle préalable à la suppression d'une compétence */
  @UseGuards(JwtAuthGuard)
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
      message: 'Suppression de la compétence enregistrée',
      data: deletedCompetence,
    };
  }
  

  @UseGuards(JwtAuthGuard)
  @Post('to/me')
  async addToMe(@Body() toMeCompetenceDto : ToMeCompetenceDto, @Request() req) {

    const userPseudo = req.user.pseudo

    // Vérifie que competence[] n'est pas un array vide
    if (toMeCompetenceDto.competences.length < 1) {
      throw new BadRequestException('competences est vide');
    };
    // Vérifie que le type de données attendu dans competences est correct
    
    toMeCompetenceDto.competences.forEach(elm => {
      if (typeof (elm) != 'string') {
        throw new BadRequestException("Le type de données dans competences est incorrect - Attendu 'string'");
      };
    });
    


    // Vérifie que les competences à ajouter existent et les crée si besoin
    const allCompetences = (await this.competencesService.findAll()).map((elm) => elm.description) ;

    
    // Création du competence inexistant
    toMeCompetenceDto.competences.filter(competence => !allCompetences.includes(competence))
    .forEach(async competence => {await this.competencesService.createCompetences({ description: competence })});

    const allMine = ( await this.competencesService.findMine(userPseudo)).map((elm) => elm.description) ;
    const allAlreadyMine = toMeCompetenceDto.competences.filter(competence => !allMine.includes(competence))
    await this.competencesService.addToMe(userPseudo, allAlreadyMine) ;

    return {
      statusCode: 201,
      message: 'Liste de mes competences',
      //data: await this.competencesService.findMine(userPseudo)
      data: (await this.competencesService.findMine(userPseudo)).map(item => item.description)
    };
  }

  /** Récupération d'un competence par son id */
  @UseGuards(JwtAuthGuard)
  @Get('to/me')
  async findMine(@Request() req) {

    const userPseudo = req.user.pseudo

    return {
      statusCode: 200,
      message: 'Liste de mes competences',
      //data: await this.competencesService.findMine(userPseudo)
      data: (await this.competencesService.findMine(userPseudo)).map(item => item.description)
    };
  };


  /** Supprimer de competences  */
  @UseGuards(JwtAuthGuard)
  @Delete('to/me')
  async subToMe(@Body() toMeCompetenceDto : ToMeCompetenceDto, @Request() req) {

    const userPseudo = req.user.pseudo

    // Vérifie que competences[] n'est pas un array vide
    if (toMeCompetenceDto.competences.length < 1) {
      throw new BadRequestException('competences est vide');
    };
    // Vérifie que le type de données attendu dans competences est correct
    
    toMeCompetenceDto.competences.forEach(elm => {
      if (typeof (elm) != 'string') {
        throw new BadRequestException("Le type de données dans competences est incorrect - Attendu 'string'");
      };
    });
    
    const allMine = ( await this.competencesService.findMine(userPseudo)).map((elm) => elm.description) ;
    const allToSub = toMeCompetenceDto.competences.filter(competence => allMine.includes(competence))
    await this.competencesService.subToMe(userPseudo, allToSub) ;

    return {
      statusCode: 201,
      message: 'Liste de mes competences',
      //data: await this.competencesService.findMine(userPseudo)
      data: (await this.competencesService.findMine(userPseudo)).map(item => item.description)
    };
}; 
}
 