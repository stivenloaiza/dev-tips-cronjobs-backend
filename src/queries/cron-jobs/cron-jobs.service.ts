import { Injectable } from '@nestjs/common';
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
      // Realiza las consultas primero
      const tips = await this.tipsService.getTips();
      const users = await this.usersService.getUsers();

      // Mapea los datos de tips
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

      // Mapea los datos de usuarios
      const usersToStore = users.map((user: UserDto) => ({
        name: user.name,
        email: user.email,
        subscribed: user.subscribed,
        subscription: user.subscription ? {
          frequency: user.subscription.frequency,
          levels: user.subscription.levels,
          technology: user.subscription.technology,
          type: user.subscription.type,
        } : null,
      }));

      // Aplica los filtros y almacena los resultados en las mismas variables
      const mailDailyUsers = usersToStore.filter(user =>
        user.subscription?.frequency === 'daily' &&
        user.subscription?.type.includes('email'),
      );

      const mailWeeklyUsers = usersToStore.filter(user =>
        user.subscription?.frequency === 'weekly' &&
        user.subscription?.type.includes('email'),
      );

      const botDailyUsers = usersToStore.filter(user =>
        user.subscription?.frequency === 'daily' &&
        user.subscription?.type.includes('bot'),
      );

      const botWeeklyUsers = usersToStore.filter(user =>
        user.subscription?.frequency === 'weekly' &&
        user.subscription?.type.includes('bot'),
      );

      console.log('Tips data fetched and stored:', tipsToStore);
      console.log('Users data fetched and stored:', usersToStore);
      console.log('Mail Daily users:', mailDailyUsers);
      console.log('Mail Weekly users:', mailWeeklyUsers);
      console.log('Bot Daily users:', botDailyUsers);
      console.log('Bot Weekly users:', botWeeklyUsers);

      return {
        tipsToStore,
        usersToStore,
        mailDailyUsers,
        mailWeeklyUsers,
        botDailyUsers,
        botWeeklyUsers,
      };
    } catch (error) {
      console.error('Error fetching data:', error.message);
      throw error;
    }
  }
}
