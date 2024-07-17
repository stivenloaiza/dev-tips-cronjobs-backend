import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CronService } from './cron.service';
import { CronController } from './cron.controller';
import { CronEntity, CronSchema } from './cron.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { MailService } from 'src/modules/mail/mail.service';
import { TipsService } from 'src/modules/queries/tips/tips.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: CronEntity.name, schema: CronSchema }]),
    ScheduleModule.forRoot(),
  ],
  controllers: [CronController],
  providers: [CronService, MailService, TipsService],
  exports: [CronService],
})
export class CronModule {}
