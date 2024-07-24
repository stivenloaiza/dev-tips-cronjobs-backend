import { Test, TestingModule } from '@nestjs/testing';
import { CronJobsController } from './cron-jobs.controller';
import { CronJobsService } from './cron-jobs.service';

describe('CronJobsController', () => {
  let controller: CronJobsController;
  let service: CronJobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CronJobsController],
      providers: [
        {
          provide: CronJobsService,
          useValue: {
            fetchAndStoreData: jest.fn().mockResolvedValue({
              tipsToStore: [],
              usersToStore: [],
              mailDailyUsers: [],
              mailWeeklyUsers: [],
              botDailyUsers: [],
              botWeeklyUsers: [],
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<CronJobsController>(CronJobsController);
    service = module.get<CronJobsService>(CronJobsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should fetch and store data successfully', async () => {
    const result = await controller.fetchAndStoreData();
    expect(result).toEqual({
      message: 'Data fetched and stored successfully',
      data: {
        tipsToStore: [],
        usersToStore: [],
        mailDailyUsers: [],
        mailWeeklyUsers: [],
        botDailyUsers: [],
        botWeeklyUsers: [],
      },
    });
  });

  it('should handle errors correctly', async () => {
    jest
      .spyOn(service, 'fetchAndStoreData')
      .mockRejectedValue(new Error('Test error'));

    const result = await controller.fetchAndStoreData();
    expect(result).toEqual({
      message: 'Error fetching data',
      error: 'Test error',
    });
  });
});
