import { Module } from '@nestjs/common';
import { LogService } from './services/log.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Logger, LoggerSchema } from './entities/log.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Logger.name, schema: LoggerSchema }]),
  ],
  controllers: [],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
