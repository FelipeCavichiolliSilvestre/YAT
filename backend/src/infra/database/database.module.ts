import { Module } from '@nestjs/common';

import { PrismaModule } from '@infra/prisma/prisma.module';

import {
  iTagRepository,
  iProjectRepository,
  iTodoRepository,
  iUserRepository,
} from './interfaces';
import {
  TagPrismaRepository,
  ProjectPrismaRepository,
  TodoPrismaRepository,
  UserPrismaRepository,
  InvitePrismaRepository,
} from './repositories';
import { iInviteRepository } from './interfaces/invite.repository.interface';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: iTagRepository,
      useClass: TagPrismaRepository,
    },
    {
      provide: iProjectRepository,
      useClass: ProjectPrismaRepository,
    },
    {
      provide: iInviteRepository,
      useClass: InvitePrismaRepository,
    },
    {
      provide: iTodoRepository,
      useClass: TodoPrismaRepository,
    },
    {
      provide: iUserRepository,
      useClass: UserPrismaRepository,
    },
  ],
  exports: [
    iTagRepository,
    iProjectRepository,
    iInviteRepository,
    iTodoRepository,
    iUserRepository,
  ],
})
export class DatabaseModule {}
