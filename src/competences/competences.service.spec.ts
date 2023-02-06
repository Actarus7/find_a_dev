import { Test, TestingModule } from '@nestjs/testing';
import { CompetencesService } from './competences.service';

describe('CompetencesService', () => {
  let service: CompetencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompetencesService],
    }).compile();

    service = module.get<CompetencesService>(CompetencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
