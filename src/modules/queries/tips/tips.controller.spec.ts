import { Test, TestingModule } from '@nestjs/testing';
import { TipsController } from './tips.controller';
import { TipsService } from './tips.service';

describe('TipsController', () => {
  let controller: TipsController;
  let service: TipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipsController],
      providers: [
        {
          provide: TipsService,
          useValue: {
            getTips: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    controller = module.get<TipsController>(TipsController);
    service = module.get<TipsService>(TipsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all tips', async () => {
    const result = await controller.getAllTips();
    expect(result).toEqual([]);
  });

  it('should handle errors correctly', async () => {
    jest.spyOn(service, 'getTips').mockRejectedValue(new Error('Test error'));

    await expect(controller.getAllTips()).rejects.toThrow('Test error');
  });
});
