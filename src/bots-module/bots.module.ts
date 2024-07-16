import { Module } from '@nestjs/common';
import { BotsController } from './controllers/bots.controller';
import { BotService } from './services/bots.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [BotsController],
  providers: [BotService],
})
export class BotsModule { }
