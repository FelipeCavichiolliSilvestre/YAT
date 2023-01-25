import { JwtModuleOptions } from '@nestjs/jwt';

export const basicJwtConfig = {
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: '7d',
  },
} as JwtModuleOptions;
