import { Module } from '@nestjs/common';
import { CompetencesService } from './competences.service';
import { CompetencesController } from './competences.controller';
import { UsersService } from 'src/users/users.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CompetencesController],
  providers: [CompetencesService, UsersService],
})
export class CompetencesModule {}
