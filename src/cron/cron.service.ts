import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { Cron } from './entities/cron.entity';
import { CreateCronDto } from './dto/create-cron.dto';
import { UpdateCronDto } from './dto/update-cron.dto';


@Injectable()
export class CronService {
  constructor(
    @InjectModel(Cron.name) private readonly cronModel: Model<Cron>,
    // private readonly emailService: EmailService,
    // private readonly botsService: BotsService,
    // private readonly queriesService: QueriesService
  ) {}

  async create(createCronDto: CreateCronDto): Promise<Cron> {
    try {
      const createdCron = new this.cronModel(createCronDto);
      await createdCron.save();
      return createdCron;
    } catch (error) {
      throw new HttpException('Error creating cron job', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Cron[]> {
    return this.cronModel.find().exec();
  }

  async findOne(id: string): Promise<Cron> {
    return this.cronModel.findById(id).exec();
  }

   async update(id: string, updateCronDto: UpdateCronDto): Promise<Cron> {
    try { 
      await this.cronModel.findByIdAndUpdate(id, updateCronDto).exec();
      const updatedCron = await this.cronModel.findById(id).exec();
      return updatedCron;
      
    } catch (error) {
      return error
      
    }
  }

  async softDelete(id: string): Promise<Cron> {
    return this.cronModel.findByIdAndUpdate(id, { deletedAt: new Date() }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.cronModel.findByIdAndDelete(id).exec();
  }

  async restore(id: string): Promise<Cron> {
    return this.cronModel.findByIdAndUpdate(id, { deletedAt: null }).exec();
  }   


  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async handleDailyCron() {
    await this.handleCron('daily');
  }

  @Cron(CronExpression.EVERY_WEEK)
  async handleWeeklyCron() {
    await this.handleCron('weekly');
  }

  private async handleCron(type: 'daily' | 'weekly') {
    const tips = await this.queriesService.getTips(type);
    const users = await this.queriesService.getUsers(type);

    const emailUsers = users.filter(user => user.preferredChannel === 'email');
    const botUsers = users.filter(user => user.preferredChannel !== 'email');

    const emailTips = tips.filter(tip => emailUsers.some(user => user.id === tip.userId));
    const botTips = tips.filter(tip => botUsers.some(user => user.id === tip.userId));

    if (emailTips.length) {
      await this.emailService.sendEmails(emailTips, type);
    }

    if (botTips.length) {
      await this.botsService.sendMessages(botTips, type);
    }
  }
}

