import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailConfig } from '@config/mail.config';
import { MailService } from '@infra/mail/mail.service';

@Global()
@Module({
  imports: [MailerModule.forRoot(mailConfig)],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
