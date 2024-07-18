import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TipsService } from '../tips/tips.service';
import { UsersService } from '../users/users.service';
import { TipDto } from '../tips/dto/tip.dto';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class CronJobsService {
  constructor(
    private readonly tipsService: TipsService,
    private readonly usersService: UsersService,
  ) {}

  async fetchAndStoreData(): Promise<{
    tipsToStore: Partial<TipDto>[];
    usersToStore: Partial<UserDto>[];
    mailDailyUsers: Partial<UserDto>[];
    mailWeeklyUsers: Partial<UserDto>[];
    botDailyUsers: Partial<UserDto>[];
    botWeeklyUsers: Partial<UserDto>[];
  }> {
    try {
      const tips = await this.tipsService.getTips();
      const users = await this.usersService.getUsers();

      const tipsToStore = tips.map((tip: TipDto) => ({
        id: tip.id,
        img_url: tip.img_url,
        title: tip.title,
        body: tip.body,
        link: tip.link,
        available: tip.available,
        technology: tip.technology,
        subtechnology: tip.subtechnology,
        level: tip.level,
      }));

      const usersToStore = users.map((user: UserDto) => ({
        name: user.name,
        email: user.email,
        subscribed: user.subscribed,
        subscriptions: user.subscriptions && Object.keys(user.subscriptions).length > 0 
          ? {
              type: user.subscriptions[0].type || null,
              level : user.subscriptions[0].level || null,
              technology: user.subscriptions[0].technology || null,
              frequency: user.subscriptions[0].frequency || null,
              channelType: user.subscriptions[0].channelType || null,
              channelId: user.subscriptions[0].channelId || null,
              lang: user.subscriptions[0].lang|| null
            }
          : null,
      }));

      const mailDailyUsers = usersToStore.filter(
        (user) =>
          user.subscriptions.frequency === 'daily' &&
          user.subscriptions.type.includes('email'),
      );

      const mailWeeklyUsers = usersToStore.filter(
        (user) =>
          user.subscriptions.frequency === 'weekly' &&
          user.subscriptions.type.includes('email'),
      );

      const botDailyUsers = usersToStore.filter(
        (user) =>
          user.subscriptions.frequency === 'daily' &&
          user.subscriptions.type.includes('bot'),
      );

      const botWeeklyUsers = usersToStore.filter(
        (user) =>
          user.subscriptions.frequency === 'weekly' &&
          user.subscriptions.type.includes('bot'),
      );

      return {
        tipsToStore,
        usersToStore,
        mailDailyUsers,
        mailWeeklyUsers,
        botDailyUsers,
        botWeeklyUsers,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
