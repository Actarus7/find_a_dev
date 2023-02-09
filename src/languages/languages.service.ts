import { Injectable } from '@nestjs/common';
import { In } from "typeorm"
import { Profile } from 'src/profiles/entities/profile.entity';
import { CreateLanguageDto } from './dto/create-language.dto';
import { Language } from './entities/language.entity';

@Injectable()
export class LanguagesService {

  /** Création d'un nouveau langage */
  async create(createLanguageDto: CreateLanguageDto | any) {

    const newLanguage = await Language.save(createLanguageDto);

    if (newLanguage) {
      return newLanguage;
    };

    return undefined;
  };


  /** Récupération de tous les langages */
  async findAll() {
    const languages = await Language.find();

    if (languages) {
      return languages;
    };

    return languages;
  };


  /** Récupération d'un langage par son id (avec les relations) */
  async findOne(id: number) {
    const language = await Language.findOneBy({ id });

    if (language) {
      return language;
    };

    return language;
  };


  /** Récupération d'un langage par son name (avec les relations) */
  async findOneByName(name: string) {
    const language = await Language.findOneBy({ name });

    if (language) {
      return language;
    };

    return language;
  };

  async update(id: number, updateLanguageDto: CreateLanguageDto) {

    const updateLanguage = await Language.update(+id, updateLanguageDto);

    if (updateLanguage) {
      return Language.findOneBy({ id });
    };

    return undefined;
  };


  async remove(id: number) {
    const deleteLanguage = await Language.findOneBy({ id });
    deleteLanguage.remove();

    if (deleteLanguage) {
      return deleteLanguage;
    };

    return undefined;
  };

  async addToMe(userPseudo: string ,names : string[]){
    const languages = await Language.find({
      where : { name : In(names)}
    })
    
    const profile = await Profile.findOne({
      where : {user : {pseudo : userPseudo}},
      relations : { 
        user : true ,
        languages : true
      }
    })
    profile.languages = [...profile.languages,...languages] ;
    await profile.save()
    return languages ;
    
  }

  async findMine(userPseudo: string){
    const profile = await Profile.findOne({
      where : {user : {pseudo : userPseudo}},
      relations : { 
        user : true ,
        languages : true
      }
    })
    return profile.languages ;
  }

  async subToMe(userPseudo: string ,names : string[]){
    
    const profile = await Profile.findOne({
      where : {user : {pseudo : userPseudo}},
      relations : { 
        user : true ,
        languages : true
      }
    })
    profile.languages = profile.languages.filter(item => !names.includes(item.name)) ;
    console.log(profile.languages);
    
    await profile.save()
    return profile.languages ;
    
  }
};
