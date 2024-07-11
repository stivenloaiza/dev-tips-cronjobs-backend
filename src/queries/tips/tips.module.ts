import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TipsController } from './tips.controller';
import { TipsService } from './tips.service';
import { Tip, TipSchema } from './schema/tips.schema';
import { TipRepository } from './repositories/tip.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tip.name, schema: TipSchema }]),
    HttpModule,
  ],
  controllers: [TipsController],
  providers: [TipsService, TipRepository],
  exports: [TipsService, TipRepository],
})
export class TipsModule {}
