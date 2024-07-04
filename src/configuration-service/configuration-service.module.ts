// src/configuration-service/configuration.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config';
import { ConfigurationService } from './configuration-service.service';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] })],
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
