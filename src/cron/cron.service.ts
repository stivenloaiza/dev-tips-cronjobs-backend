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
import { UserDto } from 'src/queries/users/dto/user.dto';
import { TipDto } from 'src/queries/tips/dto/tip.dto';
import { HttpService } from '@nestjs/axios';



@Injectable()
export class CronService {
  constructor(
    @InjectModel(CronEntity.name) private readonly cronModel: Model<CronEntity>,
    private readonly httpService: HttpService,

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
    try {
      const response = this.httpService.get("localhost:3000/api/v1/cron-jobs/fetch-and-store")
      console.log("response of service", response);
      
    } catch (error) {
      console.log("error getting data to send notifications", error);
      
    }
  }
  
  // private async sendTipToBot(user: UserDto, tip: TipDto) {

  //   const createBotMessageDto new() = {
  //     userId: user.id,
  //     mediums: ['telegram', 'discord'],
  //     tip: tip.body,
  //   };

  //   try {
  //     await this.httpService.post('http://localhost:3000/api/v1/bots/send', createBotMessageDto).toPromise();
  //     console.log('Tip sent to bot:', createBotMessageDto);
  //   } catch (error) {
  //     console.error('Error sending tip to bot:', error);
  //   }
  // }
}