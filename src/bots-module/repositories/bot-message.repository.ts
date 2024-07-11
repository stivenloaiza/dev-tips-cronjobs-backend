import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBotMessageDto } from '../dtos/create-bot-message.dto';
import { BotMessage } from '../schemas/bot-message.schema';

@Injectable()
export class BotMessageRepository {
  constructor(
    @InjectModel('BotMessage') private readonly botMessageModel: Model<BotMessage>,
  ) {}

  async create(createBotMessageDto: CreateBotMessageDto): Promise<BotMessage> {
    const createdBotMessage = new this.botMessageModel(createBotMessageDto);
    return createdBotMessage.save();
  }

  async findAll(): Promise<BotMessage[]> {
    return this.botMessageModel.find().exec();
  }

  async findById(id: string): Promise<BotMessage | null> {
    return this.botMessageModel.findById(id).exec();
  }

  async delete(id: string): Promise<BotMessage | null> {
    return this.botMessageModel.findByIdAndDelete(id).exec();
  }
}
