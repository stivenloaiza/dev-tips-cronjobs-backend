import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import dbConfig from './libs/persistence/mongodb/config/db-config';
import { PersistenceModule } from './libs/persistence/persistence.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './libs/common/filters/http-exception.filter';
import { AppService } from './app.service';
import { CronModule } from './cron/cron.module';
import { UsersModule } from './queries/users/users.module';
import { TipsModule } from './queries/tips/tips.module';
import { CronJobsModule } from './queries/cron-jobs/cron-jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    PersistenceModule,
    CronModule,
    UsersModule, 
    TipsModule, 
    CronJobsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
