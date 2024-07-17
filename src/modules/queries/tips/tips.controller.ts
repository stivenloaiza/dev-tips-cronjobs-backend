import { Controller, Get } from '@nestjs/common';
import { TipsService } from './tips.service';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Query from Tips')
@Controller('queries-tips')
export class TipsController {
  constructor(private readonly tipsService: TipsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Return all tips' })
  @ApiResponse({ status: 404, description: 'Tips not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key to access this endpoint',
    required: true,
  })
  async getAllTips() {
    return this.tipsService.getTips();
  }
}
