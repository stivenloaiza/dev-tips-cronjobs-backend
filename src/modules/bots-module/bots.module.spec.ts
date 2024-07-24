import { Test, TestingModule } from '@nestjs/testing';
import { BotsModule } from './bots.module';
import { BotService } from './bots.service';
import { BotsController } from './bots.controller';
import { HttpModule } from '@nestjs/axios';

describe('BotsModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [BotsModule],
    }).compile();
  });

  it('debería ser definido', () => {
    expect(module).toBeDefined();
  });

  it('debería proporcionar BotService', () => {
    const service = module.get<BotService>(BotService);
    expect(service).toBeDefined();
  });

  it('debería proporcionar BotsController', () => {
    const controller = module.get<BotsController>(BotsController);
    expect(controller).toBeDefined();
  });

  it('debería importar HttpModule', () => {
    const httpModule = module.get<HttpModule>(HttpModule);
    expect(httpModule).toBeDefined();
  });
});
