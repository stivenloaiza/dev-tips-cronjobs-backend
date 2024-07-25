import { Test, TestingModule } from '@nestjs/testing';
import { CronController } from './cron.controller';
import { CronService } from './cron.service';
import { CreateCronDto } from './dto/create-cron.dto';
import { UpdateCronDto } from './dto/update-cron.dto';

describe('CronController', () => {
  let controller: CronController;
  let service: CronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CronController],
      providers: [
        {
          provide: CronService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CronController>(CronController);
    service = module.get<CronService>(CronService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a cron job', async () => {
    const createCronJobDto: CreateCronDto = {
      name: 'Test job',
      schedule: '0 0 * * *',
      description: 'A test job',
      timezone: 'UTC',
      status: 'pending',
      createdBy: 'user1',
    };

    const createdCronJob = {
      ...createCronJobDto,
      id: '1',
    };

    jest.spyOn(service, 'create').mockResolvedValue(createdCronJob as any);

    // Si es necesario, ajustar para incluir mensajes y código de estado
    const expectedResponse = {
      message: 'Cron job created successfully',
      newCron: createdCronJob,
      status: 201,
    };

    expect(await controller.create(createCronJobDto)).toEqual(expectedResponse);
  });

  it('should return an array of cron jobs', async () => {
    const result = [
      {
        name: 'Test job',
        schedule: '0 0 * * *',
        description: 'A test job',
        timezone: 'UTC',
        status: 'pending',
        createdBy: 'user1',
        id: '1',
      },
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

    // Si es necesario, ajustar para incluir mensajes y código de estado
    const expectedResponse = {
      message: 'Cron jobs retrieved successfully',
      crons: result,
      status: 200,
    };

    expect(await controller.findAll()).toEqual(expectedResponse);
  });

  it('should return a single cron job', async () => {
    const result = {
      name: 'Test job',
      schedule: '0 0 * * *',
      description: 'A test job',
      timezone: 'UTC',
      status: 'pending',
      createdBy: 'user1',
      id: '1',
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(result as any);

    // Si es necesario, ajustar para incluir mensajes y código de estado
    const expectedResponse = {
      message: 'Cron job retrieved successfully',
      cron: result,
      status: 200,
    };

    expect(await controller.findOne('1')).toEqual(expectedResponse);
  });

  it('should update a cron job', async () => {
    const updateCronJobDto: UpdateCronDto = {
      name: 'Updated job',
      schedule: '0 0 * * *',
      description: 'An updated job',
      timezone: 'UTC',
      status: 'active',
    };

    const updatedCronJob = {
      ...updateCronJobDto,
      id: '1',
      createdBy: 'user1',
    };

    jest.spyOn(service, 'update').mockResolvedValue(updatedCronJob as any);

    // Si es necesario, ajustar para incluir mensajes y código de estado
    const expectedResponse = {
      message: 'Cron job updated successfully',
      updatedCron: updatedCronJob,
      status: 200,
    };

    expect(await controller.update('1', updateCronJobDto)).toEqual(
      expectedResponse,
    );

  });

  it('should remove a cron job', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    const expectedResponse = {
      message: 'Cron job permanently deleted successfully',
      status: 204,
    };

    await expect(controller.remove('1')).resolves.toEqual(expectedResponse);
  });
});
