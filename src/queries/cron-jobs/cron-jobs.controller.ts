import { Controller, Get } from '@nestjs/common';
import { CronJobsService } from './cron-jobs.service';

@Controller('cron-jobs')
export class CronJobsController {
  constructor(private readonly cronJobsService: CronJobsService) {}

  @Get('fetch-and-store-data')
  async fetchAndStoreData() {
    try {
      const {
        tipsToStore,
        usersToStore,
        mailDailyUsers,
        mailWeeklyUsers,
        botDailyUsers,
        botWeeklyUsers,
      } = await this.cronJobsService.fetchAndStoreData();

      return {
        message: 'Data fetched and stored successfully',
        data: {
          tipsToStore,
          usersToStore,
          mailDailyUsers,
          mailWeeklyUsers,
          botDailyUsers,
          botWeeklyUsers,
        },
      };
    } catch (error) {
      return {
        message: 'Error fetching data',
        error: error.message,
      };
    }
  }
}
