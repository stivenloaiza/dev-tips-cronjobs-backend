import { Injectable } from '@nestjs/common';
import { TipsService } from '../tips/tips.service';
import { UsersService } from '../users/users.service';
import { TipRepository } from '../tips/repositories/tip.repository';
import { UserRepository } from '../users/repositories/user.repository';
import { TipDto } from '../tips/dto/tip.dto';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class CronJobsService {
  constructor(
    private readonly tipsService: TipsService,
    private readonly usersService: UsersService,
    private readonly tipRepository: TipRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async fetchAndStoreData(): Promise<void> {
    try {
      const tips = await this.tipsService.getTips();
      const users = await this.usersService.getUsers();

      const tipsToStore = tips.map((tip: TipDto) => ({
        id: tip.id,
        img_url: tip.img_url,
        title: tip.title,
        body: tip.body,
        link: tip.link,
      }));

      const usersToStore = users.map((user: UserDto) => ({
        name: user.name,
        email: user.email,
        subscribed: user.subscribed,
        frequency: user.subscription ? user.subscription.frequency : null,
        seniority: user.subscription ? user.subscription.seniority : null,
        programmingLanguages: user.subscription
          ? user.subscription.programmingLanguages
          : [],
        subscriptionMedium: user.subscription ? user.subscription.medium : null,
      }));

      const mailDailyUsers = usersToStore.filter(
        (user) =>
          user.frequency === 'daily' && user.subscriptionMedium === 'email',
      );
      const mailWeeklyUsers = usersToStore.filter(
        (user) =>
          user.frequency === 'weekly' && user.subscriptionMedium === 'email',
      );
      const botDailyUsers = usersToStore.filter(
        (user) =>
          user.frequency === 'daily' && user.subscriptionMedium === 'bot',
      );
      const botWeeklyUsers = usersToStore.filter(
        (user) =>
          user.frequency === 'weekly' && user.subscriptionMedium === 'bot',
      );

      await this.tipRepository.createMany(tipsToStore);
      await this.userRepository.createMany(usersToStore);

      console.log('Tips data fetched and stored:', tipsToStore);
      console.log('Users data fetched and stored:', usersToStore);
      console.log('Mail Daily users:', mailDailyUsers);
      console.log('Mail Weekly users:', mailWeeklyUsers);
      console.log('Bot Daily users:', botDailyUsers);
      console.log('Bot Weekly users:', botWeeklyUsers);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
