import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { CronEntity } from './cron.entity';
import { CreateCronDto } from './dto/create-cron.dto';
import { UpdateCronDto } from './dto/update-cron.dto';
import { HttpService } from '@nestjs/axios';
import { TipDto } from './dto/tip-response.dto';
import { UserDto } from './dto/user-response.dto';

@Injectable()
export class CronService {
  constructor(
    @InjectModel(CronEntity.name) private readonly cronModel: Model<CronEntity>,
    private readonly httpService: HttpService,
  ) {}
  private readonly logger = new Logger(CronService.name);

  async create(createCronDto: CreateCronDto): Promise<CronEntity> {
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

  async findAll(): Promise<CronEntity[]> {
    return this.cronModel.find().exec();
  }

  async findOne(id: string): Promise<CronEntity> {
    return this.cronModel.findById(id).exec();
  }

  async update(id: string, updateCronDto: UpdateCronDto): Promise<CronEntity> {
    try {
      await this.cronModel.findByIdAndUpdate(id, updateCronDto).exec();
      const updatedCron = await this.cronModel.findById(id).exec();
      return updatedCron;
    } catch (error) {
      return error;
    }
  }

  async softDelete(id: string): Promise<CronEntity> {
    return this.cronModel
      .findByIdAndUpdate(id, { deletedAt: new Date() })
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.cronModel.findByIdAndDelete(id).exec();
  }

  async restore(id: string): Promise<CronEntity> {
    return this.cronModel.findByIdAndUpdate(id, { deletedAt: null }).exec();
  }

  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async handleDailyCron() {
    await this.handleCronDaily();
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleWeeklyCron() {
    await this.handleCronWeekly();
  }

  private async handleCronDaily() {
    try {
      const response = await this.httpService
        .get(process.env.FETCH_AND_STORE_DATA_END_POINT_URL)
        .toPromise();

      if (response.status != 200) {
        throw 'error calling service';
      }

      const tipsToStore = response?.data?.data['tipsToStore'];
      const randomIndex = Math.floor(Math.random() * tipsToStore.length);

      const tip = this.mapToTipDTO(tipsToStore[randomIndex]);
      const usersToSendEmail = response.data.data['mailDailyUsers'];
      const usersToSendBots = response.data.data['botDailyUsers'];

      for (let i = 0; i < usersToSendEmail.length; i++) {
        const user = this.mapToUserDto(usersToSendEmail[i]);

        const body = {
          name: user.name,
          email: user.email,
          link: tip.link,
          img_url: tip.img_url,
          tipsToStore: tip.body,
        };

        await this.httpService
          .post(process.env.QUERIES_END_POINT_TO_SEND_TIPS_TO_MAIL_URL, body, {
            headers: {
              'x-api-key': process.env.X_API_KEY,
            },
          })
          .toPromise();
      }

      for (let i = 0; i < usersToSendBots.length; i++) {
        this.mapToUserDto(usersToSendBots[i]);

        const botBody = {
          multimedia_url: tip.img_url,
          title: tip.title,
          body: tip.body,
          link: tip.link,
          level: tip.level,
          lang: tip.lang,
          technology: tip.technology,
          subtechnology: tip.subtechnology,
          channelId: tip.body,
          channel: tip.body,
        };
        await this.httpService
          .post(
            process.env.QUERIES_END_POINT_TO_SEND_TIPS_TO_BOTS_URL,
            botBody,
            {
              headers: {
                'x-api-key': process.env.X_API_KEY,
              },
            },
          )
          .toPromise();
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async handleCronWeekly() {
    try {
      const response = await this.httpService
        .get(process.env.FETCH_AND_STORE_DATA_END_POINT_URL, {
          headers: {
            'x-api-key': process.env.X_API_KEY,
          },
        })
        .toPromise();

      if (response.status != 200) {
        throw 'error calling service';
      }

      const tipsToStore = response?.data?.data['tipsToStore'];
      const randomIndex = Math.floor(Math.random() * tipsToStore.length);

      const tip = this.mapToTipDTO(tipsToStore[randomIndex]);
      const usersToSendEmail = response.data.data['mailWeeklyUsers'];
      const usersToSendBots = response.data.data['botWeeklyUsers'];

      for (let i = 0; i < usersToSendEmail.length; i++) {
        const user = this.mapToUserDto(usersToSendEmail[i]);

        const body = {
          name: user.name,
          email: user.email,
          link: tip.link,
          img_url: tip.img_url,
          tipsToStore: tip.body,
        };
        await this.httpService
          .post(process.env.QUERIES_END_POINT_TO_SEND_TIPS_TO_MAIL_URL, body, {
            headers: {
              'x-api-key': process.env.X_API_KEY,
            },
          })
          .toPromise();
      }

      for (let i = 0; i < usersToSendBots.length; i++) {
        this.mapToUserDto(usersToSendBots[i]);

        const botBody = {
          multimedia_url: tip.img_url,
          title: tip.title,
          body: tip.body,
          link: tip.link,
          level: tip.level,
          lang: tip.lang,
          technology: tip.technology,
          subtechnology: tip.subtechnology,
          channelId: tip.body,
          channel: tip.body,
        };
        await this.httpService
          .post(
            process.env.QUERIES_END_POINT_TO_SEND_TIPS_TO_BOTS_URL,
            botBody,
            {
              headers: {
                'x-api-key': process.env.X_API_KEY,
              },
            },
          )
          .toPromise();
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  mapToTipDTO(response: any): TipDto {
    return {
      id: response.id,
      img_url: response.img_url,
      title: response.title,
      body: response.body,
      link: response.link,
      available: response.available,
      technology: response.technology,
      subtechnology: response.subtechnology,
      lang: response.lang,
      level: response.level,
    };
  }

  mapToUserDto(response: any): UserDto {
    return {
      name: response.name,
      email: response.email,
      subscribed: response.subscribed,
      subscription: {
        frequency: response.subscription.frequency,
        levels: response.subscription.levels,
        technology: response.subscription.technology,
        type: response.subscription.type,
      },
    };
  }
}
