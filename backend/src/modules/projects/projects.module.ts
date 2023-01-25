import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AuthModule } from '@modules/auth/auth.module';
import { TagsModule } from '@modules/tags/tags.module';
import { TodosModule } from '@modules/todos/todos.module';
import { UsersModule } from '@modules/users/users.module';

import {
  ProjectBaseController,
  ProjectInviteController,
  ProjectMemberController,
  ProjectTagController,
  ProjectTodoController,
} from './controllers';
import { iInviteService, iProjectService } from './interfaces';
import { BasicProjectService, LinkInviteService } from './services';
import { ProjectGateway } from './gateways';

@Module({
  imports: [AuthModule, DatabaseModule, TagsModule, TodosModule, UsersModule],
  controllers: [
    ProjectBaseController,
    ProjectInviteController,
    ProjectMemberController,
    ProjectTagController,
    ProjectTodoController,
  ],
  providers: [
    {
      provide: iProjectService,
      useClass: BasicProjectService,
    },
    {
      provide: iInviteService,
      useClass: LinkInviteService,
    },
    ProjectGateway,
  ],
  exports: [iProjectService, iInviteService],
})
export class ProjectsModule {}
