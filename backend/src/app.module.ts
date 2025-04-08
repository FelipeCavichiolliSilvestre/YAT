import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TagsModule } from '@modules/tags/tags.module';
import { ProjectsModule } from '@modules/projects/projects.module';
import { TodosModule } from '@modules/todos/todos.module';
import { UsersModule } from '@modules/users/users.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailModule } from '@infra/mail/mail.module';

@Module({
  imports: [
    UsersModule,
    TagsModule,
    ProjectsModule,
    TodosModule,
    MailModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      renderPath: 'docs',
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
