import { Injectable } from '@nestjs/common';
import { BotMessageRepository } from '../repositories/bot-message.repository';
import { CreateBotMessageDto } from '../dtos/create-bot-message.dto';
import { BotMessage } from '../schemas/bot-message.schema';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class BotService {
  constructor(
    private readonly botMessageRepository: BotMessageRepository,
    private readonly httpService: HttpService,
  ) {}

  async sendMessageToBots(createBotMessageDto: CreateBotMessageDto): Promise<BotMessage> {
    const savedMessage = await this.botMessageRepository.create(createBotMessageDto);

    if (createBotMessageDto.mediums.includes('telegram')) {
      await this.sendTelegramMessage(createBotMessageDto.tip);
    }

    if (createBotMessageDto.mediums.includes('discord')) {
      await this.sendDiscordMessage(createBotMessageDto.tip);
    }

    return savedMessage;
  }

  private async sendTelegramMessage(message: string): Promise<AxiosResponse> {
    const telegramApiUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_API_TOKEN}/sendMessage`;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    return this.httpService.post(telegramApiUrl, {
      chat_id: chatId,
      text: message,
    }).toPromise();
  }

  private async sendDiscordMessage(message: string): Promise<AxiosResponse> {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    return this.httpService.post(webhookUrl, {
      content: message,
    }).toPromise();
  }
}
