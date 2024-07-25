import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TipsController } from './tips.controller';
import { TipsService } from './tips.service';
import { Tip, TipSchema } from './schema/tips.schema';
import { TipRepository } from './repositories/tip.repository';
import { HttpModule } from '@nestjs/axios';
import { LogModule } from 'src/libs/log/log.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tip.name, schema: TipSchema }]),
    HttpModule,
    LogModule,
  ],
  controllers: [TipsController],
  providers: [TipsService, TipRepository],
  exports: [TipsService, TipRepository],
})
export class TipsModule {}
