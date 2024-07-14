import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { CronEntity } from './cron.entity';
import { CreateCronDto } from './dto/create-cron.dto';
import { UpdateCronDto } from './dto/update-cron.dto';
import { MailService } from 'src/mail/mail.service';
import { BotService } from 'src/bots-module/services/bots.service';
import { UsersService } from 'src/queries/users/users.service';
import { TipsService } from 'src/queries/tips/tips.service';
import { CronJobsService } from 'src/queries/cron-jobs/cron-jobs.service';


@Injectable()
export class CronService {
  constructor(
    @InjectModel(CronEntity.name) private readonly cronModel: Model<CronEntity>,

    private readonly emailService: MailService,
    private readonly botsService: BotService,
    private readonly usersService: UsersService,
    private readonly tipsService: TipsService,
    private readonly cronJobService: CronJobsService,

  ) { }
  private readonly logger = new Logger(CronService.name)

  async create(createCronDto: CreateCronDto): Promise<CronEntity> {
    try {
      const createdCron = new this.cronModel(createCronDto);
      await createdCron.save();
      return createdCron;
    } catch (error) {
      throw new HttpException(
        'Error creating cron job',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<CronEntity[]> {
    return this.cronModel.find().exec();
  }

  async findOne(id: string): Promise<CronEntity> {
    return this.cronModel.findById(id).exec();
  }

  async update(id: string, updateCronDto: UpdateCronDto): Promise<CronEntity> {
    try {
      await this.cronModel.findByIdAndUpdate(id, updateCronDto).exec();
      const updatedCron = await this.cronModel.findById(id).exec();
      return updatedCron;
    } catch (error) {
      return error;
    }
  }

  async softDelete(id: string): Promise<CronEntity> {
    return this.cronModel
      .findByIdAndUpdate(id, { deletedAt: new Date() })
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.cronModel.findByIdAndDelete(id).exec();
  }

  async restore(id: string): Promise<CronEntity> {
    return this.cronModel.findByIdAndUpdate(id, { deletedAt: null }).exec();
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleDailyCron() {
    await this.handleCron();
  }

  // '0 8 * * 1'
  @Cron(CronExpression.EVERY_MINUTE)
  async handleWeeklyCron() {
    await this.handleCron();
  }

  private async handleCron() {
    this.cronJobService.fetchAndStoreData()
  }
  
}