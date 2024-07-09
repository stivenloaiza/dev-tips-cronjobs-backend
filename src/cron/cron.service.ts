import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cron } from './entities/cron.entity';
import { CreateCronDto } from './dto/create-cron.dto';
import { UpdateCronDto } from './dto/update-cron.dto';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob as CronJobLib } from 'cron';
// import { EmailService } from 'src/email/email.service';
// import { BotService } from 'src/bot/bot.service';

@Injectable()
export class CronService {
  constructor(
    @InjectModel(Cron.name) private readonly cronModel: Model<Cron>,
    private schedulerRegistry: SchedulerRegistry,
    // private emailService: EmailService,
    // private botService: BotService,
  ) {}

  async create(createCronDto: CreateCronDto): Promise<Cron> {
    const createdCron = new this.cronModel(createCronDto);
    await createdCron.save();
    this.addCronJobToScheduler(createdCron);
    return createdCron;
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
      this.addCronJobToScheduler(updatedCron);
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

  private addCronJobToScheduler(cronJob: Cron) {
    const job = new CronJobLib(cronJob.schedule, () => {
      // Implementar lógica de envío de correos y mensajes de bots aquí
      // this.emailService.sendEmail(cronJob.createdBy, 'Scheduled Email', 'This is a scheduled email.');
      // this.botService.sendMessage(cronJob.createdBy, 'This is a scheduled bot message.');
    });

    this.schedulerRegistry.addCronJob(`cron-job-${cronJob.id}`, job);
    job.start();
  }
}
