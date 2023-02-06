import { Module } from '@nestjs/common';
import { CompetencesService } from './competences.service';
import { CompetencesController } from './competences.controller';

@Module({
  controllers: [CompetencesController],
  providers: [CompetencesService]
})
export class CompetencesModule {}
