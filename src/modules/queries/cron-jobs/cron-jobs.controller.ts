import { Controller, Get } from '@nestjs/common';
import { CronJobsService } from './cron-jobs.service';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TipDto } from '../tips/dto/tip.dto';
import { UserDto } from '../users/dto/user.dto';

@Controller('queries-cron-jobs')
export class CronJobsController {
  constructor(private readonly cronJobsService: CronJobsService) {}

  @ApiTags('Query for Cron Jobs Module')
  @Get('fetch-and-store-data')
  @ApiOperation({
    summary: 'Fetch and store data',
    description:
      'Fetches data from external sources and stores it in the database.',
  })
  @ApiResponse({ status: 200, description: 'Return all data' })
  @ApiResponse({ status: 404, description: 'Data not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key to access this endpoint',
    required: true,
  })
  async fetchAndStoreData(): Promise<
    | {
        message: string;
        data: {
          tipsToStore: Partial<TipDto>[];
          usersToStore: Partial<UserDto>[];
          mailDailyUsers: Partial<UserDto>[];
          mailWeeklyUsers: Partial<UserDto>[];
          botDailyUsers: Partial<UserDto>[];
          botWeeklyUsers: Partial<UserDto>[];
        };
        error?: undefined;
      }
    | { message: string; error: any; data?: undefined }
  > {
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
