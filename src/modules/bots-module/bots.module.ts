import { Module } from '@nestjs/common';
import { BotsController } from './bots.controller';
import { BotService } from './bots.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [BotsController],
  providers: [BotService],
})
export class BotsModule {}
