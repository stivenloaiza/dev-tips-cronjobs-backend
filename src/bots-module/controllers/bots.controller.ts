import { Controller, Post, Body } from '@nestjs/common';
import { BotService } from '../services/bots.service';
import { CreateBotMessageDto } from '../dtos/create-bot-message.dto';
import { BotMessage } from '../schemas/bot-message.schema';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Bots')
@Controller('bots')
export class BotsController {
  constructor(private readonly botService: BotService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send a tip to bots' })
  @ApiResponse({ status: 201, description: 'Tip sent successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async sendMessageToBots(
    @Body() createBotMessageDto: CreateBotMessageDto,
  ): Promise<BotMessage> {
    return this.botService.sendMessageToBots(createBotMessageDto);
  }
}
