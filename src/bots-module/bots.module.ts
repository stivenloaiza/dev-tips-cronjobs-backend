import { Module, HttpModule } from '@nestjs/common';
import { BotsController } from './controllers/bots.controller';
import { BotService } from './services/bots.service';

@Module({
  imports: [HttpModule],
  controllers: [BotsController],
  providers: [BotService],
})
export class BotsModule {}
