import { Test, TestingModule } from '@nestjs/testing';
import { CronJobsService } from './cron-jobs.service';
import { TipsService } from '../tips/tips.service';
import { UsersService } from '../users/users.service';

describe('CronJobsService', () => {
  let service: CronJobsService;
  let tipsService: TipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CronJobsService,
        {
          provide: TipsService,
          useValue: { getTips: jest.fn().mockResolvedValue([]) },
        },
        {
          provide: UsersService,
          useValue: { getUsers: jest.fn().mockResolvedValue([]) },
        },
      ],
    }).compile();

    service = module.get<CronJobsService>(CronJobsService);
    tipsService = module.get<TipsService>(TipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch and store data successfully', async () => {
    const result = await service.fetchAndStoreData();
    expect(result).toEqual({
      tipsToStore: [],
      usersToStore: [],
      mailDailyUsers: [],
      mailWeeklyUsers: [],
      botDailyUsers: [],
      botWeeklyUsers: [],
    });
  });

  it('should throw an error if fetching data fails', async () => {
    jest
      .spyOn(tipsService, 'getTips')
      .mockRejectedValue(new Error('Test error'));

    await expect(service.fetchAndStoreData()).rejects.toThrow('Test error');
  });
});
