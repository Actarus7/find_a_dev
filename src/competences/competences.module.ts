import { Module } from '@nestjs/common';
import { CompetencesService } from './competences.service';
import { CompetencesController } from './competences.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [CompetencesController],
  providers: [CompetencesService, UsersService]
})
export class CompetencesModule { }
