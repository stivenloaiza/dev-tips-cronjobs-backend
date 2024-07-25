import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';

describe('MailService', () => {
  let mailService: MailService;
  let mockMailgunClient;

  beforeAll(() => {
    process.env.MAILGUN_DOMAIN =
      'sandbox89b677a90a844597bf0842cebf131b9b.mailgun.org';
  });

  beforeEach(async () => {
    mockMailgunClient = {
      messages: {
        create: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: 'MAILGUN_CLIENT',
          useValue: mockMailgunClient,
        },
      ],
    }).compile();

    mailService = module.get<MailService>(MailService);
  });

  describe('sendEmail', () => {
    it('should send an email successfully', async () => {
      const to = 'juan@gmail.com';
      const subject = 'Juan';
      const text = 'Hi world!';
      const html = '<p>Hi world!</p>';

      jest
        .spyOn(mockMailgunClient.messages, 'create')
        .mockResolvedValue({} as any);

      const result = await mailService.sendEmail(to, subject, text, html);
      expect(result).toEqual({ message: 'Email sent successfully!' });
      expect(mockMailgunClient.messages.create).toHaveBeenCalledWith(
        process.env.MAILGUN_DOMAIN,
        {
          from: `Excited User <mailgun@${process.env.MAILGUN_DOMAIN}>`,
          to,
          subject,
          text,
          html,
        },
      );
    });

    it('should handle errors when sending an email', async () => {
      const to = 'juan@gmail.com';
      const subject = 'Juan';
      const text = 'Hi world!';
      const html = '<p>Hi world!</p>';

      jest
        .spyOn(mockMailgunClient.messages, 'create')
        .mockRejectedValue(new Error('Send email failed'));

      await expect(
        mailService.sendEmail(to, subject, text, html),
      ).rejects.toThrow('Send email failed');
    });
  });
});
