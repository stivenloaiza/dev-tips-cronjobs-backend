import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationService } from './configuration-service.service';

describe('ConfigurationServiceService', () => {
  let service: ConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigurationService],
    }).compile();

    service = module.get<ConfigurationService>(ConfigurationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
