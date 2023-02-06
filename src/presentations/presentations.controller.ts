import { Controller, Get, Post, Body, Patch, Param, Delete, Bind, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { PresentationsService } from './presentations.service';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';

@Controller('presentations')
export class PresentationsController {
  constructor(private readonly presentationsService: PresentationsService) {}

  @Post()
  create(@Body() createPresentationDto: CreatePresentationDto) {
    return this.presentationsService.create(createPresentationDto);
  }

  @Get()
  findAll() {
    return this.presentationsService.findAll();
  }

  @Get(':id')
  @Bind(Param('id', new ParseIntPipe()))
  findOne(@Param('id') id: string) {
    return this.presentationsService.findOne(+id);
  }

  @Patch(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async update(@Param('id') id: number, @Body() updatePresentationDto: UpdatePresentationDto) {
    const isPresentationExists = await this.presentationsService.findOne(id);
    if(!isPresentationExists){
      throw new BadRequestException('Présentation non trouvée');
    };
    return this.presentationsService.update(+id, updatePresentationDto);
  }

  @Delete(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async remove(@Param('id') id: number) {
    const isPresentationExists = await this.presentationsService.findOne(id);
    if (!isPresentationExists){
      throw new BadRequestException('Présentation non trouvée');
    };
    const deletedPresentation = await isPresentationExists.remove();
    return deletedPresentation
  }
}
