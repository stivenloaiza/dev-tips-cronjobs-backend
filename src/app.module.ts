import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './libs/persistence/mongodb/config/db-config';
import { PersistenceModule } from './libs/persistence/persistence.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './libs/common/filters/http-exception.filter';
import { MailModule } from './mail/mail.module';
import { CronModule } from './cron/cron.module';
import { UsersModule } from './queries/users/users.module';
import { TipsModule } from './queries/tips/tips.module';
import { CronJobsModule } from './queries/cron-jobs/cron-jobs.module';
import { BotsModule } from './bots-module/bots.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    PersistenceModule,
    MailModule,
    CronModule,
    UsersModule,
    TipsModule,
    CronJobsModule,
    BotsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
