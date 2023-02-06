import { Module } from '@nestjs/common';
import { PresentationsService } from './presentations.service';
import { PresentationsController } from './presentations.controller';

@Module({
  controllers: [PresentationsController],
  providers: [PresentationsService]
})
export class PresentationsModule {}
