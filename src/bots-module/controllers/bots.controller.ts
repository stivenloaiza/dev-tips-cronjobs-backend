import { Controller, Post, Body } from '@nestjs/common';
import { BotService } from '../services/bots.service';
import { TipDto } from '../dtos/tip.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Bots')
@Controller('bots')
export class BotsController {
  constructor(private readonly botService: BotService) {}

  @Post('send-bots-tip')
  @ApiOperation({ summary: 'Send a tip to bots' })
  @ApiResponse({ status: 201, description: 'Tip sent successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async sendTipToBots(@Body() tipDto: TipDto): Promise<void> {
    await this.botService.sendTipToBots(tipDto);
  }
}
