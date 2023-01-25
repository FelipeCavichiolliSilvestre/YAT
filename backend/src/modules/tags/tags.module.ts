import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';

import { iTagService } from './interfaces';
import { BasicTagService } from './services/basic-tag.service';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    {
      provide: iTagService,
      useClass: BasicTagService,
    },
  ],
  exports: [iTagService],
})
export class TagsModule {}
