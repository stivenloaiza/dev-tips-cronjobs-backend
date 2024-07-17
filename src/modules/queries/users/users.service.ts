import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './repositories/user.repository';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userRepository: UserRepository,
  ) {}

  async getUsers(): Promise<UserDto[]> {
    try {
      const response: AxiosResponse<UserDto[]> = await this.httpService
        .get(process.env.END_POINT_USERS, {
          headers: {
            'x-api-key': process.env.X_API_KEY,
          },
        })
        .toPromise();
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async getUserById(id: string): Promise<UserDto> {
    try {
      const response: AxiosResponse<UserDto> = await this.httpService
        .get(`${process.env.END_POINT_USERS}/${id}`, {
          headers: {
            'x-api-key': process.env.X_API_KEY,
          },
        })
        .toPromise();
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
  }
}
