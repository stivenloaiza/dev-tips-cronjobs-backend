import { Controller, Get } from '@nestjs/common';
import { TipsService } from './tips.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Queries Tips')
@Controller('queries-tips')
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