import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CronService } from './cron.service';
import { CronController } from './cron.controller';
import { CronEntity, CronSchema } from './cron.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { MailService } from 'src/mail/mail.service';
import { UsersModule } from 'src/queries/users/users.module';
import { TipsService } from 'src/queries/tips/tips.service';
import { HttpModule } from '@nestjs/axios';
import { BotsModule } from 'src/bots-module/bots.module';
import { CronJobsModule } from 'src/queries/cron-jobs/cron-jobs.module';



@Module({
  imports: [
    BotsModule,
    HttpModule,
    UsersModule,
    CronJobsModule,
    MongooseModule.forFeature([
      { name: CronEntity.name, schema: CronSchema },
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [CronController],
  providers: [
    CronService, 
    MailService, 
    TipsService
  ],
  exports: [CronService],
})
export class CronModule { }
