import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { DatabaseModule } from '@infra/database/database.module';

import { iAuthenticationService, iAuthorizationService } from './interfaces';
import { AuthenticationService, AuthorizationService } from './services';

import { basicJwtConfig } from '@config/jwt.config';

@Module({
  imports: [DatabaseModule, JwtModule.register(basicJwtConfig)],
  providers: [
    {
      provide: iAuthenticationService,
      useClass: AuthenticationService,
    },
    {
      provide: iAuthorizationService,
      useClass: AuthorizationService,
    },
  ],
  exports: [iAuthenticationService, iAuthorizationService],
})
export class AuthModule {}
