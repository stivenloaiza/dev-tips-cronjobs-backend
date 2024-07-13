import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BotsController } from './controllers/bots.controller';
import { BotService } from './services/bots.service';
import { BotMessageRepository } from './repositories/bot-message.repository';
import { BotMessageSchema } from './schemas/bot-message.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'BotMessage', schema: BotMessageSchema }]),
  ],
  controllers: [BotsController],
  providers: [BotService, BotMessageRepository],
})
export class BotsModule {}
