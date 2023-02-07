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
    const languages = await Language.find();

    if (languages) {
      return languages;
    };

    return languages;
  };


  async findOne(id: number) {
    const language = await Language.findOneBy({id});

    if (language) {
      return language;
    };

    return language;
  };


  async update(id: number, updateLanguageDto: UpdateLanguageDto) {

    const updateLanguage = await Language.update(+id, updateLanguageDto);

    if (updateLanguage) {
      return Language.findOneBy({id});
    };
    
    return undefined;
  };


  async remove(id: number) {
    const deleteLanguage = await Language.findOneBy({id});
    deleteLanguage.remove();

    if (deleteLanguage) {
      return deleteLanguage;
    };

    return undefined;
  };

};
