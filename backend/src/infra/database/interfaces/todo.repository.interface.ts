import { TodoEntity } from '@modules/Todos/entities';
import { Injectable } from '@nestjs/common';

import {
  FindManyInputBase,
  iCrudRepository,
} from './crud.repository.interface';

@Injectable()
export abstract class iTodoRepository extends iCrudRepository<
  TodoEntity,
  CreateOneTodoInput,
  UpdateOneTodoInput,
  FindManyTodosInput
> {
  abstract connectTagsToTodo(data: AlterTagsOfTodoInput): Promise<TodoEntity>;
  abstract disconectTagsToTodo(data: AlterTagsOfTodoInput): Promise<TodoEntity>;
}

export interface CreateOneTodoInput {
  name: string;
  projectId: number;
  completed?: boolean;
  tagsIds?: number[];
}

export interface UpdateOneTodoInput {
  name?: string;
  completed?: boolean;
}

export type FindManyTodosInput = FindManyInputBase<TodoEntity>;

export interface AlterTagsOfTodoInput {
  todoId: number;
  tagsIds: number[];
}
