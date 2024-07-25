import {
  Injectable,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';

@Injectable()
export class MailService {
  private mg;

  constructor(@Inject('MAILGUN_CLIENT') mailgunClient) {
    this.mg = mailgunClient;
  }

  async sendEmail(to: string, subject: string, text: string, html: string) {
    try {
      await this.mg.messages.create(process.env.MAILGUN_DOMAIN, {
        from: `Excited User <mailgun@${process.env.MAILGUN_DOMAIN}>`,
        to,
        subject,
        text,
        html,
      });

      return { message: 'Email sent successfully!' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
