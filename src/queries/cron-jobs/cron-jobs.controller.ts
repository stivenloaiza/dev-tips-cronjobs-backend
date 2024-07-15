import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CronJobsService } from './cron-jobs.service';

@ApiTags('Queries Cron Job')
@Controller('cron-jobs')
export class CronJobsController {
  constructor(private readonly cronJobsService: CronJobsService) {}

  @Get('fetch-and-store')
  @ApiOperation({ summary: 'Fetch and store data' })
  @ApiResponse({
    status: 200,
    description: 'Data fetched and stored successfully.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async fetchAndStoreData(): Promise<{
    tipsToStore: any[];
    usersToStore: any[];
    mailDailyUsers: any[];
    mailWeeklyUsers: any[];
    botDailyUsers: any[];
    botWeeklyUsers: any[];
  }> {
    return this.cronJobsService.fetchAndStoreData();
  }
}
