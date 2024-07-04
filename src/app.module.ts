import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './configuration-service/configuration-service.module';
import { LoggerModule } from './logger-service/logger-service.module';

@Module({
  imports: [ConfigurationModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
