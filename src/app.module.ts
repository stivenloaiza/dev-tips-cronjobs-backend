import { Module /* , NestModule, MiddlewareConsumer */ } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './libs/persistence/mongodb/config/db-config';
import { PersistenceModule } from './libs/persistence/persistence.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './libs/common/filters/http-exception.filter';
import { MailModule } from './modules/mail/mail.module';
import { CronModule } from './modules/cron/cron.module';
import { UsersModule } from './modules/queries/users/users.module';
import { TipsModule } from './modules/queries/tips/tips.module';
import { CronJobsModule } from './modules/queries/cron-jobs/cron-jobs.module';
import { BotsModule } from './modules/bots-module/bots.module';
import { ScheduleModule } from '@nestjs/schedule';
/* import { ApiKeyMiddleware } from './libs/common/middleware/x-api-key-guard';
 */
@Module({
  imports: [
    ScheduleModule.forRoot(),
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
export class AppModule /* implements NestModule */ {
  /*   configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
  } */
}
