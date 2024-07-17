import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as FormData from 'form-data';
import Mailgun from 'mailgun.js';

@Injectable()
export class MailService {
  private mg;

  constructor() {
    const mailgun = new Mailgun(FormData);
    this.mg = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY,
    });
  }

  async sendEmail(to: string, subject: string, text: string, html: string) {
    try {
      const result = await this.mg.messages.create(process.env.MAILGUN_DOMAIN, {
        from: `Excited User <mailgun@${process.env.MAILGUN_DOMAIN}>`,
        to,
        subject,
        text,
        html,
      });

      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
