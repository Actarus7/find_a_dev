import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { LanguagesService } from 'src/languages/languages.service';
import { CompetencesService } from 'src/competences/competences.service';
import { PresentationsService } from 'src/presentations/presentations.service';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService, LanguagesService, CompetencesService, PresentationsService]
})
export class ProfilesModule {}
