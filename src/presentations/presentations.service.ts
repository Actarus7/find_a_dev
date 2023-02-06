import { Injectable } from '@nestjs/common';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import { Presentation } from './entities/presentation.entity';

@Injectable()
export class PresentationsService
{
  create(createPresentationDto: CreatePresentationDto | any)
  {
    const newPresentation = Presentation.save(createPresentationDto)
    return newPresentation;
  }

  findAll()
  {
    return Presentation.find();
  }

  findOne(id: number)
  {
    return Presentation.findOneBy({ id });
  }

  async update(id: number, updatePresentationDto: UpdatePresentationDto)
  {
    const newPresentation = await Presentation.update(id, updatePresentationDto);
    if (newPresentation)
    {
      return await Presentation.findOneBy({ id });
    };
    return undefined;
  }

  async remove(id: number | any)
  {
    const presentation = await Presentation.remove(id);

    if (presentation)
    {
      return `This action removes a #${id} presentation`;
    }
    return undefined
  }
}
