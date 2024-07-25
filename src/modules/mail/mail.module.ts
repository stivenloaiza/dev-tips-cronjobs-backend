import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { LogModule } from 'src/libs/log/log.module';

@Module({
  imports: [LogModule],
  providers: [MailService],
  controllers: [MailController],
})
export class MailModule {}
