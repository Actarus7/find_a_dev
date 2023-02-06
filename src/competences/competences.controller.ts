import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { Bind } from '@nestjs/common/decorators';
import { CompetencesService } from './competences.service';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';

@Controller('competences')
export class CompetencesController {
  constructor(private readonly competencesService: CompetencesService) {}

  @Post()
  create(@Body() createCompetenceDto: CreateCompetenceDto) {
    return this.competencesService.createCompetences(createCompetenceDto);
  }

  @Get()
  findAll() {
    return this.competencesService.findAll();
  }

  @Get(':id')
  @Bind(Param('id', new ParseIntPipe()))
  findOne(@Param('id') id: string) {
    return this.competencesService.findOne(+id);
  }

  @Patch(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async update(@Param('id') id: number, @Body() updateCompetenceDto: UpdateCompetenceDto) {

    const isCompetenceExists = await this.competencesService.findOne(id);

    if (!isCompetenceExists) {
      throw new BadRequestException('Compétence non trouvée');
    };

    return await this.competencesService.update(+id, updateCompetenceDto);
    
  };



  @Delete(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async remove(@Param('id') id: number) {

    const isCompetenceExists = await this.competencesService.findOne(id);

    if (!isCompetenceExists) {
      throw new BadRequestException('Compétence non trouvée');
    };
    const deletedCompetence =  await isCompetenceExists.remove();

    return deletedCompetence
  }
}
