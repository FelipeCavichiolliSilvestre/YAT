import { MailerOptions } from '@nestjs-modules/mailer';

export const mailConfig = {
  transport: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  },
  defaults: {
    from: 'felipecavichiollisilvestre@gmail.com',
  },
} as MailerOptions;
