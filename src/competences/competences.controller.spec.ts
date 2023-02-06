import { Test, TestingModule } from '@nestjs/testing';
import { CompetencesController } from './competences.controller';
import { CompetencesService } from './competences.service';

describe('CompetencesController', () => {
  let controller: CompetencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompetencesController],
      providers: [CompetencesService],
    }).compile();

    controller = module.get<CompetencesController>(CompetencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
