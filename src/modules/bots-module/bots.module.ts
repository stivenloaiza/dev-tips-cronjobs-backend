import { Module } from '@nestjs/common';
import { BotsController } from './bots.controller';
import { BotService } from './bots.service';
import { HttpModule } from '@nestjs/axios';
import { LogModule } from '../../libs/log/log.module';

@Module({
  imports: [HttpModule, LogModule],
  controllers: [BotsController],
  providers: [BotService],
})
export class BotsModule {}
