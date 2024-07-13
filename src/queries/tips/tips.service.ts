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
        .get('URL_DEL_ENDPOINT_DE_TIPS') 
        // revisar que ya es una variable de entorno 
        // corre en el 3001/tips-users

        .toPromise();
      return response.data;
    } catch (error) {
      console.error('Error fetching tips:', error);
      throw error;
    }
  }
}
