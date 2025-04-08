import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerificationEmail(
    email: string,
    verificationCode: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      html: `<h3>${verificationCode} </h3>`,
    });
  }
}
