import { Controller, Get, Post, Body, Patch, Param, Delete, Bind, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  async create(@Body() createProfileDto: CreateProfileDto) {
    
    // Vérifie que la présentation n'est pas déjà attribuée à un profil (1 profil = 1 présentation)
    // Faire une findOne Profil par présentation id ...
    
    const newProfile = await this.profilesService.create(createProfileDto);

    return newProfile;
  };

  
  @Get()
  findAll() {
    return this.profilesService.findAll();
  };


  @Get(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async findOne(@Param('id') id: string) {

    const profile = await this.profilesService.findOne(+id);
    
    if (profile.length < 0) {
      throw new BadRequestException('Aucun profil à afficher');
    };
    
    return profile;
  };


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(+id, updateProfileDto);
  };


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesService.remove(+id);
  };
};
