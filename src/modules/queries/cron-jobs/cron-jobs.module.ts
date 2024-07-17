import { Module } from '@nestjs/common';
import { TipsModule } from '../tips/tips.module';
import { UsersModule } from '../users/users.module';
import { PersistenceModule } from '../../../libs/persistence/persistence.module';
import { CronJobsService } from './cron-jobs.service';
import { CronJobsController } from './cron-jobs.controller';

@Module({
  imports: [TipsModule, UsersModule, PersistenceModule],
  providers: [CronJobsService],
  controllers: [CronJobsController],
  exports: [CronJobsService],
})
export class CronJobsModule {}
