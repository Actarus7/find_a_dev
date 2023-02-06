import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompetencesService } from './competences.service';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';

@Controller('competences')
export class CompetencesController {
  constructor(private readonly competencesService: CompetencesService) {}

  @Post()
  create(@Body() createCompetenceDto: CreateCompetenceDto) {
    return this.competencesService.create(createCompetenceDto);
  }

  @Get()
  findAll() {
    return this.competencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.competencesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompetenceDto: UpdateCompetenceDto) {
    return this.competencesService.update(+id, updateCompetenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.competencesService.remove(+id);
  }
}
