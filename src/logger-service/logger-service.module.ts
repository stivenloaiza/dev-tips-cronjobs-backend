// src/logger-service/logger.module.ts
import { Module } from '@nestjs/common';
import { CustomLoggerService } from './logger-service.service';

@Module({
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class LoggerModule {}
