import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {

  /** Crée d'un nouveau profil */
  async create(createProfileDto: CreateProfileDto | any, userIdLogged: number | any) {


    const newProfile = new Profile();
    newProfile.languages = createProfileDto.languages;
    newProfile.competences = createProfileDto.competences;
    newProfile.presentation = createProfileDto.presentation;
    newProfile.user = userIdLogged;

    await newProfile.save();

    if (newProfile) {
      return newProfile;
    };

    return undefined;
  };


  /** Récupère tous les profils (avec relations) */
  async findAll() {
    const profiles = await Profile.find({
      relations: {
        presentation: true,
        languages: true,
        competences: true,
        user: true
      },
      select: { user: { id: true } },
    });

    if (profiles) {
      return profiles;
    };

    return undefined;
  };


  /** Récupère un profil par son id (avec relations) */
  async findOne(id: number) {
    const profile = await Profile.find({
      relations: {
        presentation: true,
        languages: true,
        competences: true,
        user: true
      },
      select: { user: { id: true } },
      where: { id }
    });

    if (profile) {
      return profile;
    };

    return undefined;
  };


  /** Récupère un profil par le userId */
  async findOneByUserId(userId) {
    const profile = await Profile.find({where: {user: userId}});

    if (profile) {
      return profile;
    };

    return undefined;
  };

  /** Récupère un profil par le presentationId */
  async findOneByPresentationId(presentationId) {
    const profile = await Profile.find({where: {presentation: presentationId}});

    if (profile) {
      return profile;
    };

    return undefined;
  };


  /** Modifie un profil (langages et compétences seulement - annule et remplace les existants) */
  async update(id: number, updateProfileDto: UpdateProfileDto | any) {
    const profile = await Profile.findOneBy({ id });
    profile.languages = updateProfileDto.languages;
    profile.competences = updateProfileDto.competences;
    await Profile.save(profile);

    if (profile) {
      return this.findOne(id);
    };

    return undefined;
  };


  /** Supprime un profil */
  async remove(id: number) {

    const deleteProfile = await Profile.findOneBy({ id });
    deleteProfile.remove();

    if (deleteProfile) {
      return deleteProfile;
    };

    return undefined;
  };

};
