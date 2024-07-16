import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { TipDto } from './dto/tip.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TipsService {
  constructor(private readonly httpService: HttpService) {}

  async getTips(): Promise<TipDto[]> {
    try {
      const response: AxiosResponse<TipDto[]> = await this.httpService
        .get(process.env.END_POINT_TIPS)
        .toPromise();
      return response.data;
    } catch (error) {
      console.error('Error fetching tips:', error.message);
      throw error;
    }
  }
}