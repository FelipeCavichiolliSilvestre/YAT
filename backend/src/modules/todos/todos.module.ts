import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';

import { iTodoService } from './interfaces';
import { BasicTodoService } from './services';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: iTodoService,
      useClass: BasicTodoService,
    },
  ],
  exports: [iTodoService],
})
export class TodosModule {}
