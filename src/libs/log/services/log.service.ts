import { Injectable, Logger as NestLogger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger } from '../entities/log.entity';

@Injectable()
export class LogService {
  private readonly logger = new NestLogger(LogService.name);

  constructor(
    @InjectModel(Logger.name)
    private readonly logModel: Model<Logger>,
  ) {}

  async log(cronjobId: string, message: string, level: string) {
    if (level === 'error') {
      this.logger.error(message);
    } else {
      this.logger.log(`[${level}] ${message}`);
    }
    const log = new this.logModel({
      cronjobId,
      message,
      level,
      timestamp: new Date(),
    });
    await log.save();
  }

  async logInfo(cronjobId: string, message: string) {
    await this.log(cronjobId, message, 'Info');
  }

  async logError(cronjobId: string, message: string, stack: string) {
    await this.log(cronjobId, message, 'Error');
    this.logger.error(message, stack);
  }
}
