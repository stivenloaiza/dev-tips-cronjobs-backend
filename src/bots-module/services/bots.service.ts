import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { TipDto } from '../dtos/tip.dto';
import { AxiosResponse } from 'axios';

@Injectable()
export class BotService {
  constructor(private readonly httpService: HttpService) {}

  async sendTipToBots(tipDto: TipDto): Promise<AxiosResponse> {
    const url = process.env.BOTS_API_URL;
    return this.httpService.post(url, tipDto).toPromise();
  }
}
