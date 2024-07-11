import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cron } from './cron.entity';
import { CreateCronDto } from './dto/create-cron.dto';
import { UpdateCronDto } from './dto/update-cron.dto';

@Injectable()
export class CronService {
  constructor(
    @InjectModel(Cron.name) private readonly cronModel: Model<Cron>,
  ) {}

  async create(createCronDto: CreateCronDto): Promise<Cron> {
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
      return error;
    }
  }

  async softDelete(id: string): Promise<Cron> {
    return this.cronModel
      .findByIdAndUpdate(id, { deletedAt: new Date() })
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.cronModel.findByIdAndDelete(id).exec();
  }

  async restore(id: string): Promise<Cron> {
    return this.cronModel.findByIdAndUpdate(id, { deletedAt: null }).exec();
  }
}
