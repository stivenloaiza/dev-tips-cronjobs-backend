import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CronService } from './cron.service';
import { CronController } from './cron.controller';
import { Cron, CronSchema } from './entities/cron.entity';
import { ScheduleModule } from '@nestjs/schedule';
// import { EmailModule } from '../email/email.module';
// import { BotModule } from '../bot/bot.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cron.name, schema: CronSchema }]),
    ScheduleModule.forRoot(),
    // EmailModule,
    // BotModule,
  ],
  controllers: [CronController],
  providers: [CronService],
  exports: [CronService],
})
export class CronModule {}
