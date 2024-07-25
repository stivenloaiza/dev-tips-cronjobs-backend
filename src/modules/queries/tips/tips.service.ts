import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { TipDto } from './dto/tip.dto';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class TipsService {
  constructor(private readonly httpService: HttpService) {}

  async getTips(): Promise<TipDto[]> {
    try {

      const response: AxiosResponse<TipDto[]> = await this.httpService
        .get(`${process.env.END_POINT_TIPS}/tips/random?limit=1`, {
          headers: {
            'x-api-key': process.env.CRON_X_API_KEY,
          },
        })
        .toPromise();

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch tips',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
