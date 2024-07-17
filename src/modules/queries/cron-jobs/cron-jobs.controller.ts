import { Controller, Get } from '@nestjs/common';
import { CronJobsService } from './cron-jobs.service';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('queries-cron-jobs')
export class CronJobsController {
  constructor(private readonly cronJobsService: CronJobsService) {}

  @ApiTags('Query for Cron Jobs Module')
  @Get('fetch-and-store-data')
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
          tipsToStore: Partial<
            import('c:/Users/Missy/OneDrive/Escritorio/Samuel/Aprendizaje Integral/RIWI/Desarrollo de Software/Git Home Workstation/Etapa Final/Refinamiento/dev-tips-cronjobs-backend/src/modules/queries/tips/dto/tip.dto').TipDto
          >[];
          usersToStore: Partial<
            import('c:/Users/Missy/OneDrive/Escritorio/Samuel/Aprendizaje Integral/RIWI/Desarrollo de Software/Git Home Workstation/Etapa Final/Refinamiento/dev-tips-cronjobs-backend/src/modules/queries/users/dto/user.dto').UserDto
          >[];
          mailDailyUsers: Partial<
            import('c:/Users/Missy/OneDrive/Escritorio/Samuel/Aprendizaje Integral/RIWI/Desarrollo de Software/Git Home Workstation/Etapa Final/Refinamiento/dev-tips-cronjobs-backend/src/modules/queries/users/dto/user.dto').UserDto
          >[];
          mailWeeklyUsers: Partial<
            import('c:/Users/Missy/OneDrive/Escritorio/Samuel/Aprendizaje Integral/RIWI/Desarrollo de Software/Git Home Workstation/Etapa Final/Refinamiento/dev-tips-cronjobs-backend/src/modules/queries/users/dto/user.dto').UserDto
          >[];
          botDailyUsers: Partial<
            import('c:/Users/Missy/OneDrive/Escritorio/Samuel/Aprendizaje Integral/RIWI/Desarrollo de Software/Git Home Workstation/Etapa Final/Refinamiento/dev-tips-cronjobs-backend/src/modules/queries/users/dto/user.dto').UserDto
          >[];
          botWeeklyUsers: Partial<
            import('c:/Users/Missy/OneDrive/Escritorio/Samuel/Aprendizaje Integral/RIWI/Desarrollo de Software/Git Home Workstation/Etapa Final/Refinamiento/dev-tips-cronjobs-backend/src/modules/queries/users/dto/user.dto').UserDto
          >[];
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
