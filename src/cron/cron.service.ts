import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { CronEntity } from './cron.entity';
import { CreateCronDto } from './dto/create-cron.dto';
import { UpdateCronDto } from './dto/update-cron.dto';
import { HttpService } from '@nestjs/axios';
import { TipDto } from './dto/tip-response.dto'
import { UserDto } from './dto/user-response.dto'


@Injectable()
export class CronService {
  constructor(
    @InjectModel(CronEntity.name) private readonly cronModel: Model<CronEntity>,
    private readonly httpService: HttpService,
    // private readonly mailService: MailService
  ) { }
  private readonly logger = new Logger(CronService.name)

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

   @Cron('0 8 * * 1')
   async handleWeeklyCron() {
     await this.handleCronWeekly();
   }

  private async handleCronDaily() {
    try {

      const response = await this.httpService
        .get("http://localhost:3000/api/v1/cron-jobs/fetch-and-store-data")
        .toPromise();

      if (response.status != 200) {
        throw ("error calling service")
      }

      const tipsToStore = response?.data?.data['tipsToStore'];
      const randomIndex = Math.floor(Math.random() * tipsToStore.length);

      const tip = this.mapToTipDTO(tipsToStore[randomIndex])
      const usersToSendEmail = response.data.data['mailDailyUsers']
      const usersToSendBots = response.data.data['botDailyUsers']

      for (let i = 0; i < usersToSendEmail.length; i++) {
        let user = this.mapToUserDto(usersToSendEmail[i])

        const body = {
          "name": user.name,
          "email": user.email,
          "link": tip.link,
          "img_url": tip.img_url,
          "tipsToStore": tip.body
        }
        console.log(body);

        const result = await this.httpService
          .post("http://localhost:3000/api/v1/mail/tips", body)
          .toPromise()

        console.log('Cron job: Email sent successfully:', result);
      }

      for (let i = 0; i < usersToSendBots.length; i++) {
        let bots = this.mapToUserDto(usersToSendBots[i]);

        const botBody = {
          "multimedia_url": tip.img_url,
          "title": tip.title,
          "body": tip.body,
          "link": tip.link,
          "level": tip.level,
          "lang": tip.lang,
          "technology": tip.technology,
          "subtechnology": tip.subtechnology,
          "channelId": tip.body,
          "channel": tip.body,
        }
        const execution = await this.httpService
          .post("http://localhost:3000/api/v1/bots/send-tip", botBody)
          .toPromise()

        console.log("Cron Job: Bot sent succesfully", execution);



      }


    } catch (error) {
      console.log("error getting data to send notifications", error);

    }
  }

  private async handleCronWeekly() {
    try {

      const response = await this.httpService
        .get("http://localhost:3000/api/v1/cron-jobs/fetch-and-store-data")
        .toPromise();

      if (response.status != 200) {
        throw ("error calling service")
      }

      const tipsToStore = response?.data?.data['tipsToStore'];
      const randomIndex = Math.floor(Math.random() * tipsToStore.length);

      const tip = this.mapToTipDTO(tipsToStore[randomIndex])
      const usersToSendEmail = response.data.data['mailWeeklyUsers']
      const usersToSendBots = response.data.data['botWeeklyUsers']

      for (let i = 0; i < usersToSendEmail.length; i++) {
        let user = this.mapToUserDto(usersToSendEmail[i]);

        const body = {
          "name": user.name,
          "email": user.email,
          "link": tip.link,
          "img_url": tip.img_url,
          "tipsToStore": tip.body
        }
        const result = await this.httpService
          .post("http://localhost:3000/api/v1/mail/tips", body)
          .toPromise()

        console.log("Cron Job: Bot sent succesfully", result);
      }

      for (let i = 0; i < usersToSendBots.length; i++) {
        let user = this.mapToUserDto(usersToSendBots[i]);

        const botBody = {
          "multimedia_url": tip.img_url,
          "title": tip.title,
          "body": tip.body,
          "link": tip.link,
          "level": tip.level,
          "lang": tip.lang,
          "technology": tip.technology,
          "subtechnology": tip.subtechnology,
          "channelId": tip.body,
          "channel": tip.body,
        };
        const botResult = await this.httpService
          .post("http://localhost:3000/api/v1/bots/tips", botBody)
          .toPromise();

        console.log('Cron job: Bot message sent successfully:', botResult);
      }
    } catch(error) {
    console.log("error getting data to send notifications", error);
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
      level: response.level
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
        type: response.subscription.type
      }
    };
  }
}
