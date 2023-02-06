import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './entities/language.entity';

@Injectable()
export class LanguagesService {
  async create(createLanguageDto: CreateLanguageDto | any) {
    const newLanguage = await Language.save(createLanguageDto);

    if (newLanguage) {
      return newLanguage;
    };

    return undefined;
  };

  async findAll() {
    return `This action returns all languages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} language`;
  }

  update(id: number, updateLanguageDto: UpdateLanguageDto) {
    return `This action updates a #${id} language`;
  }

  remove(id: number) {
    return `This action removes a #${id} language`;
  }
}
