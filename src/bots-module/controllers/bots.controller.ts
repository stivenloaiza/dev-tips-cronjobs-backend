import { Controller, Post, Body } from '@nestjs/common';
import { BotService } from '../services/bots.service';

@Controller('bots')
export class BotsController {
  constructor(private readonly botService: BotService) {}

  @Post('send')
  async sendMessage(@Body() { mediums, message }: { mediums: string[]; message: string }) {
    return this.botService.sendMessageToBots(mediums, message);
  }
}
