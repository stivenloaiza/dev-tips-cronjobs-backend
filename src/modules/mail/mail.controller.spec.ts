import { Test, TestingModule } from '@nestjs/testing';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

describe('MailController', () => {
  let mailController: MailController;
  let mailService: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
      providers: [
        {
          provide: MailService,
          useValue: {
            sendEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    mailController = module.get<MailController>(MailController);
    mailService = module.get<MailService>(MailService);
  });

  describe('signup', () => {
    it('should send a welcome email', async () => {
      const body = { name: 'Juan Jaramillo', email: 'juan@gmail.com' };
      const sendEmailResponse = { message: 'Email sent successfully!' };

      jest
        .spyOn(mailService, 'sendEmail')
        .mockResolvedValue(sendEmailResponse as any);

      const result = await mailController.signup(body);
      expect(result).toEqual(sendEmailResponse);
      expect(mailService.sendEmail).toHaveBeenCalledWith(
        body.email,
        'Gracias por Suscribirte!',
        'Gracias por registrarte!',
        expect.any(String),
      );
    });
  });

  describe('tipoftheday', () => {
    it('should send a tip of the day email', async () => {
      const body = {
        name: 'Juan Jaramillo',
        email: 'juan@gmail.com',
        link: 'https://example.com/tip',
        img_url: 'https://example.com/image.jpg',
        tipsToStore: 'Keep your code clean',
        level: 'Senior',
        technology: 'Typescript',
        subtechnology: 'Nestjs',
      };
      const sendEmailResponse = { message: 'Email sent successfully!' };

      jest
        .spyOn(mailService, 'sendEmail')
        .mockResolvedValue(sendEmailResponse as any);

      const result = await mailController.tipoftheday(body);
      expect(result).toEqual(sendEmailResponse);
      expect(mailService.sendEmail).toHaveBeenCalledWith(
        body.email,
        'Tu Consejo del Dia!',
        `Tu consejo del día ${body.tipsToStore}!`,
        expect.any(String),
      );
    });
  });

  describe('sendCode', () => {
    it('should send an access code email', async () => {
      const body = { code: '123456', email: 'juan@gmail.com' };
      const sendEmailResponse = { message: 'Email sent successfully!' };

      jest
        .spyOn(mailService, 'sendEmail')
        .mockResolvedValue(sendEmailResponse as any);

      const result = await mailController.sendCode(body);
      expect(result).toEqual(sendEmailResponse);
      expect(mailService.sendEmail).toHaveBeenCalledWith(
        body.email,
        'Codigo de acceso',
        `Tu codigo de acceso es: ${body.code.toUpperCase()}`,
        expect.any(String),
      );
    });
  });
});
