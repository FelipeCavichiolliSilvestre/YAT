import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TagsModule } from '@modules/tags/tags.module';
import { ProjectsModule } from '@modules/projects/projects.module';
import { TodosModule } from '@modules/todos/todos.module';
import { UsersModule } from '@modules/users/users.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    UsersModule,
    TagsModule,
    ProjectsModule,
    TodosModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      renderPath: 'static',
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
