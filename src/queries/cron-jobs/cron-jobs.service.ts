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

  async fetchAndStoreData(): Promise<{
    tipsToStore: any[];
    usersToStore: any[];
    mailDailyUsers: any[];
    mailWeeklyUsers: any[];
    botDailyUsers: any[];
    botWeeklyUsers: any[];
  }> {
    try {
      // Obtener tips y usuarios
      const tips = await this.tipsService.getTips();
      const users = await this.usersService.getUsers();

      // Mapear los tips y usuarios a un formato adecuado para almacenar
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
        frequency: user.subscription?.frequency || null,
        seniority: user.subscription?.seniority || null,
        programmingLanguages: user.subscription?.programmingLanguages || [],
        subscriptionMedium: user.subscription?.medium || null,
      }));

      // Filtrar usuarios según sus preferencias de notificación
      const mailDailyUsers = usersToStore.filter(
        (user) => user.frequency === 'daily' && user.subscriptionMedium === 'email',
      );
      const mailWeeklyUsers = usersToStore.filter(
        (user) => user.frequency === 'weekly' && user.subscriptionMedium === 'email',
      );
      const botDailyUsers = usersToStore.filter(
        (user) => user.frequency === 'daily' && user.subscriptionMedium === 'bot',
      );
      const botWeeklyUsers = usersToStore.filter(
        (user) => user.frequency === 'weekly' && user.subscriptionMedium === 'bot',
      );

      // Almacenar los tips y usuarios en la base de datos
      await this.tipRepository.createMany(tipsToStore);
      await this.userRepository.createMany(usersToStore);

      // Devolver las variables procesadas
      return {
        tipsToStore,
        usersToStore,
        mailDailyUsers,
        mailWeeklyUsers,
        botDailyUsers,
        botWeeklyUsers,
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Error fetching data');
    }
  }
}