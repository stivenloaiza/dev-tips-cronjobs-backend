import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { HttpService } from '@nestjs/axios';
import { UserRepository } from './repositories/user.repository';
import { AxiosResponse, AxiosHeaders } from 'axios';
import { of, throwError } from 'rxjs';
import { UserDto } from './dto/user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            findById: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch users successfully', async () => {
    const usersArray: UserDto[] = [];
    const response: AxiosResponse<{ items: UserDto[] }> = {
      data: { items: usersArray },
      status: 200,
      statusText: 'OK',
      headers: new AxiosHeaders(),
      config: {} as any,
    };

    jest.spyOn(httpService, 'get').mockReturnValue(of(response));

    const result = await service.getUsers();
    expect(result).toEqual(usersArray);
  });

  it('should handle errors correctly when fetching users', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockReturnValueOnce(
        throwError(() => new Error('Internal Server Error')),
      );

    await expect(service.getUsers()).rejects.toThrow('Internal Server Error');
  });

  it('should fetch user by ID successfully', async () => {
    const user: UserDto = {
      name: 'Daniel Dominguez',
      email: 'daniel.dani@gmail.com',
      subscribed: true,
      subscriptions: {
        frequency: 'daily',
        level: ['junior'],
        technology: ['nestjs'],
        type: ['tutorial'],
        channelType: 'email',
        channelId: '1234',
        lang: 'JavaScript',
      },
    };

    const response: AxiosResponse<UserDto> = {
      data: user,
      status: 200,
      statusText: 'OK',
      headers: new AxiosHeaders(),
      config: {} as any,
    };

    jest.spyOn(httpService, 'get').mockReturnValue(of(response));

    const result = await service.getUserById('1234');
    expect(result).toEqual(user);
  });

  it('should handle errors correctly when fetching user by ID', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockReturnValueOnce(
        throwError(() => new Error('Internal Server Error')),
      );

    await expect(service.getUserById('1234')).rejects.toThrow(
      'Internal Server Error',
    );
  });
});
