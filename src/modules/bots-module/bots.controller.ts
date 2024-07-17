import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BotService } from './bots.service';
import { BotDto } from './dtos/bot.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiHeader,
} from '@nestjs/swagger';

@ApiTags('Bots')
@Controller('bots')
export class BotsController {
  constructor(private readonly botService: BotService) {}

  @Post('send-tip')
  @ApiOperation({ summary: 'Send a tip to bots' })
  @ApiResponse({ status: 201, description: 'Tip sent successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key to access this endpoint',
    required: true,
  })
  @ApiBody({
    description: 'Details of the tip to be sent to bots',
    type: BotDto,
  })
  async sendTipToBots(@Body() botDto: BotDto) {
    try {
      const response = await this.botService.sendTipToBots(botDto);
      return {
        statusCode: 201,
        message: 'Tip sent successfully.',
        data: response.data,
      };
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
