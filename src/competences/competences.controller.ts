import
{
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
  ForbiddenException
} from '@nestjs/common';
import { Bind, UseGuards } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { CompetencesService } from './competences.service';
import { CreateCompetenceDto } from './dto/create-competence.dto';

/**Class permettant le contrôle des données entrantes pour les requête competences */
//décorateur Tag permettant de catégoriser les différentes route dans la doc API Swagger
@ApiTags('Competences')
//décorateur de contrôle qui récupère toutes les données de CompetencesService
@Controller('competences')
export class CompetencesController {
  constructor(
    private readonly competencesService: CompetencesService,
    private readonly usersService: UsersService) { }

  /**Contrôle préalable à l'ajout d'une nouvelle compétence, tout en applicant les obligations de createCompetenceDto */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCompetenceDto: CreateCompetenceDto, @Request() req) {
    const userIdLogged = req.user.id;

    // Vérifie que le user connecté existe encore
    const isUserExists = await this.usersService.findOneById(userIdLogged);

    if (!isUserExists) {
      throw new ForbiddenException("Le token n'existe plus ! L'utilisateur a été supprimé de la BDD")
    };



    // Verification des Doublons
    const description = createCompetenceDto.description;
    const isCompetencesExists =
      await this.competencesService.findOneByDescription(description);


    if (isCompetencesExists)
    {
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
  async findAll()
  {
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
  async findOne(@Param('id') id: string)
  {
    const oneCompetence = await this.competencesService.findOne(+id);
    if (!oneCompetence)
    {
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
    @Body() updateCompetenceDto: CreateCompetenceDto, @Request() req
  ) {
    const userIdLogged = req.user.id;

    // Vérifie que le user connecté existe encore
    const isUserExists = await this.usersService.findOneById(userIdLogged);

    if (!isUserExists) {
      throw new ForbiddenException("Le token n'existe plus ! L'utilisateur a été supprimé de la BDD")
    };


    const isCompetenceExists = await this.competencesService.findOne(id);

    if (!isCompetenceExists)
    {
      throw new BadRequestException('Compétence non trouvée');
    }

    const isCompetencesExists =
      await this.competencesService.findOneByDescription(
        updateCompetenceDto.description,
      );


    if (isCompetencesExists)
    {
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
  async remove(@Param('id') id: number, @Request() req) {

    const userIdLogged = req.user.id;

    // Vérifie que le user connecté existe encore
    const isUserExists = await this.usersService.findOneById(userIdLogged);

    if (!isUserExists) {
      throw new ForbiddenException("Le token n'existe plus ! L'utilisateur a été supprimé de la BDD")
    };

    // Vérifie que la compétence existe
    const isCompetenceExists = await this.competencesService.findOne(id);

    if (!isCompetenceExists)
    {
      throw new BadRequestException('Compétence non trouvée');
    }
    const deletedCompetence = await isCompetenceExists.remove();

    // Supprime la compétence
    return {
      statusCode: 201,
      message: 'Suppression de la compétence enregistrée',
      data: deletedCompetence,
    };
  }
}
