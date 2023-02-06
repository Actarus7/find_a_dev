import { Injectable } from '@nestjs/common';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';

@Injectable()
export class PresentationsService {
  create(createPresentationDto: CreatePresentationDto) {
    return 'This action adds a new presentation';
  }

  findAll() {
    return `This action returns all presentations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} presentation`;
  }

  update(id: number, updatePresentationDto: UpdatePresentationDto) {
    return `This action updates a #${id} presentation`;
  }

  remove(id: number) {
    return `This action removes a #${id} presentation`;
  }
}
