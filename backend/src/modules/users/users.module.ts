import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';

import { AuthModule } from '@modules/auth/auth.module';

import { UserRestController } from './controllers';
import { iUserService } from './interfaces';
import { BasicUserService } from './services';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [UserRestController],
  providers: [
    {
      provide: iUserService,
      useClass: BasicUserService,
    },
  ],
  exports: [iUserService],
})
export class UsersModule {}
