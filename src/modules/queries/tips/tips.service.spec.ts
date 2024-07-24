import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from 'axios';
import { TipsService } from './tips.service';
import { TipDto } from './dto/tip.dto';

describe('TipsService', () => {
  let service: TipsService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TipsService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TipsService>(TipsService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch tips successfully', async () => {
    const response: AxiosResponse<TipDto[]> = {
      data: [],
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        url: 'http://localhost',
        method: 'get',
        headers: new AxiosHeaders(),
      } as AxiosRequestConfig,
    } as AxiosResponse<TipDto[]>;
    jest.spyOn(httpService, 'get').mockReturnValue(of(response));

    const result = await service.getTips();
    expect(result).toEqual([]);
  });

  it('should handle errors correctly', async () => {
    jest.spyOn(httpService, 'get').mockReturnValueOnce(
      throwError(() => new Error('Internal Server Error'))
    );

    await expect(service.getTips()).rejects.toThrow('Failed to fetch tips');
  });
});
