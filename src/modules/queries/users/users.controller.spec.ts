import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getUsers: jest.fn(),
            getUserById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users', async () => {
    const users: UserDto[] = [];
    jest.spyOn(service, 'getUsers').mockResolvedValue(users);

    const result = await controller.getAllUsers();
    expect(result).toEqual(users);
  });

  it('should handle errors correctly when fetching all users', async () => {
    jest
      .spyOn(service, 'getUsers')
      .mockRejectedValue(new Error('Internal Server Error'));

    await expect(controller.getAllUsers()).rejects.toThrow(
      'Internal Server Error',
    );
  });

  it('should return a user by ID', async () => {
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
    jest.spyOn(service, 'getUserById').mockResolvedValue(user);

    const result = await controller.getUserById('1234');
    expect(result).toEqual(user);
  });

  it('should handle errors correctly when fetching user by ID', async () => {
    jest
      .spyOn(service, 'getUserById')
      .mockRejectedValue(new Error('Internal Server Error'));

    await expect(controller.getUserById('1234')).rejects.toThrow(
      'Internal Server Error',
    );
  });
});
