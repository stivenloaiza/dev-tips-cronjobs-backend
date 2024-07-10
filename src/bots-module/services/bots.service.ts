import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class BotService {
  constructor(private readonly httpService: HttpService) {}

  async sendMessageToBots(mediums: string[], message: string) {
    if (mediums.includes('telegram')) {
      await this.sendTelegramMessage(message);
    }

    if (mediums.includes('discord')) {
      await this.sendDiscordMessage(message);
    }
  }

  private async sendTelegramMessage(message: string) {
    const telegramApiUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_API_TOKEN}/sendMessage`;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    await this.httpService.post(telegramApiUrl, {
      chat_id: chatId,
      text: message,
    }).toPromise();
  }

  private async sendDiscordMessage(message: string) {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    await this.httpService.post(webhookUrl, {
      content: message,
    }).toPromise();
  }
}
