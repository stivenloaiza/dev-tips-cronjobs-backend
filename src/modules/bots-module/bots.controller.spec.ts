import { Test, TestingModule } from '@nestjs/testing';
import { BotsController } from './bots.controller';
import { BotService } from './bots.service';
import { BotDto } from './dtos/bot.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('BotsController', () => {
  let controller: BotsController;
  let service: BotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BotsController],
      providers: [
        {
          provide: BotService,
          useValue: {
            sendTipToBots: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BotsController>(BotsController);
    service = module.get<BotService>(BotService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should successfully send the tip to bots', async () => {
    const botDto: BotDto = {
      img_url: 'https://example.com/image.jpg',
      title: 'Javascript advice',
      body: 'All content structure for the tip',
      link: 'https://javascript.net/example/',
      level: 'Junior',
      lang: 'Spanish',
      technology: 'Javascript',
      subtechnology: 'jwt',
      channelId: '953770917346050191',
      channelType: 'discord',
    };

    const response = { data: 'Tip sent' };
    jest.spyOn(service, 'sendTipToBots').mockResolvedValue(response as any);

    const result = await controller.sendTipToBots(botDto);
    expect(result).toEqual({
      statusCode: 201,
      message: 'Tip sent successfully.',
      data: response.data,
    });
  });

  it('should handle errors correctly', async () => {
    const botDto: BotDto = {
      img_url: 'https://example.com/image.jpg',
      title: 'Javascript Tip',
      body: 'All content structure for the tip',
      link: 'https://javascript.net/first_steps/',
      level: 'Junior',
      lang: 'Spanish',
      technology: 'Javascript',
      subtechnology: 'jwt',
      channelId: '953770917346050191',
      channelType: 'discord',
    };

    jest
      .spyOn(service, 'sendTipToBots')
      .mockRejectedValue(
        new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );

    await expect(controller.sendTipToBots(botDto)).rejects.toThrow(
      HttpException,
    );
  });
});