import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  async create(createProfileDto: CreateProfileDto | any) {
    const newProfile = await Profile.save(createProfileDto);

    if (newProfile) {
      return newProfile;
    };

    return undefined;
  };

  async findAll() {
    const profiles = await Profile.find({
      relations: {
        presentation: true,
        languages: true,
        competences: true
      }
    });

    if (profiles) {
      return profiles;
    };

    return undefined;
  };

  async findOne(id: number) {
    const profile = await Profile.find({
      relations: {
        presentation: true,
        languages: true,
        competences: true
      },
      where: { id }
    });

    if (profile) {
      return profile;
    };

    return undefined;
  };

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
