import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { BotDto } from './dtos/bot.dto';
import { AxiosResponse } from 'axios';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class BotService {
  private readonly logger = new Logger(BotService.name);

  constructor(private readonly httpService: HttpService) {}

  async sendTipToBots(botDto: BotDto): Promise<AxiosResponse> {
    const url = process.env.BOTS_API_URL;

    this.logger.log(`Sending tip to URL: ${url}`);
    this.logger.log(`Tip data: ${JSON.stringify(botDto)}`);

    return this.httpService
      .post(url, botDto, {
        headers: {
          'x-api-key': process.env.X_API_KEY,
        },
      })
      .pipe(
        catchError((error) => {
          const errorMessage = `Error sending tip to bots: ${error.message}`;
          this.logger.error(errorMessage, error.stack);
          if (error.response) {
            this.logger.error(
              `Response data: ${JSON.stringify(error.response.data)}`,
            );
            this.logger.error(`Response status: ${error.response.status}`);
            this.logger.error(
              `Response headers: ${JSON.stringify(error.response.headers)}`,
            );
          }
          return throwError(
            () =>
              new HttpException(
                {
                  status: HttpStatus.INTERNAL_SERVER_ERROR,
                  error: errorMessage,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
          );
        }),
      )
      .toPromise();
  }
}
