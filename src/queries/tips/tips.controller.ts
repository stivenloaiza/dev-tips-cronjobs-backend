import { Controller, Get } from '@nestjs/common';
import { TipsService } from './tips.service';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

@Controller('tips')
export class TipsController {
  constructor(private readonly tipsService: TipsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Return all tips' })
  @ApiResponse({ status: 404, description: 'Tips not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAllTips() {
    return this.tipsService.getTips();
  }
}
