import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { BotService } from '../services/bots.service';
import { TipDto } from '../dtos/tip.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Bots')
@Controller('bots')
export class BotsController {
  constructor(private readonly botService: BotService) {}

  @Post('send-tip')
  @ApiOperation({ summary: 'Send a tip to bots' })
  @ApiResponse({ status: 201, description: 'Tip sent successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiBody({
    description: 'Details of the tip to be sent to bots',
    type: TipDto,
  })
  async sendTipToBots(@Body() tipDto: TipDto) {
    try {
      await this.botService.sendTipToBots(tipDto);
      return { statusCode: 201, message: 'Tip sent successfully.' };
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

