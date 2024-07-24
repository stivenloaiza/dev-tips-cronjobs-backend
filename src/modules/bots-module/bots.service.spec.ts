import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';
import { BotService } from './bots.service';
import { BotDto } from './dtos/bot.dto';

describe('BotService', () => {
  let service: BotService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BotService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BotService>(BotService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería enviar el tip a los bots exitosamente', async () => {
    const botDto: BotDto = {
      img_url: 'https://example.com/image.jpg',
      title: 'Javascript Tip',
      body: 'Toda la estructura del contenido para el tip',
      link: 'https://javascript.net/first_steps/',
      level: 'Junior',
      lang: 'Spanish',
      technology: 'Javascript',
      subtechnology: 'jwt',
      channelId: '953770917346050191',
      channelType: 'discord',
    };

    const response: AxiosResponse<any> = {
      data: 'Tip enviado',
      status: 200,
      statusText: 'OK',
      headers: {} as any,
      config: {
        url: 'http://localhost',
        method: 'post',
        headers: {} as any,
      } as any,
    };

    jest.spyOn(httpService, 'post').mockReturnValue(of(response));

    const result = await service.sendTipToBots(botDto);
    expect(result.data).toEqual('Tip enviado');
  });

  it('debería manejar errores correctamente', async () => {
    const botDto: BotDto = {
      img_url: 'https://example.com/image.jpg',
      title: 'Javascript advice',
      body: 'structure of content for tip',
      link: 'https://javascript.net/first_steps/',
      level: 'Junior',
      lang: 'Spanish',
      technology: 'Javascript',
      subtechnology: 'jwt',
      channelId: '953770917346050191',
      channelType: 'discord',
    };

    jest.spyOn(httpService, 'post').mockReturnValueOnce(
      throwError(() => new Error('Internal Server Error'))
    );

  });
});
