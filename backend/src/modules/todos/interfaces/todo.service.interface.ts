import { Injectable } from '@nestjs/common';

import { TodoEntity } from '../entities';

import {
  NumberType,
  OptionalBooleanType,
  OptionalNumberType,
  OptionalStringType,
  StringType,
} from '@lib/decorators';
import { Length } from 'class-validator';

@Injectable()
export abstract class iTodoService {
  abstract create(data: CreateTodoInput): Promise<TodoEntity>;
  abstract delete(data: DeleteTodoInput): Promise<void>;
  abstract update(id: number, data: UpdateTodoInput): Promise<TodoEntity>;
  abstract getOne(data: GetOneTodoInput): Promise<Partial<TodoEntity>>;

  abstract insertTag(data: InsertOrRemoveTagInput): Promise<TodoEntity>;
  abstract removeTag(data: InsertOrRemoveTagInput): Promise<TodoEntity>;
}

export class CreateTodoInput {
  @StringType()
  @Length(2, 20)
  name: string;

  @OptionalBooleanType()
  completed?: boolean = false;

  @NumberType()
  projectId: number;

  @OptionalNumberType({ isArray: true })
  tagsIds?: number[];
}

export class DeleteTodoInput {
  @NumberType()
  id: number;
}

export class UpdateTodoInput {
  @OptionalStringType()
  @Length(2, 20)
  name?: string;

  @OptionalBooleanType()
  completed?: boolean;
}

export class GetOneTodoInput {
  @NumberType()
  id: number;
}

export class InsertOrRemoveTagInput {
  @NumberType()
  todoId: number;

  @NumberType()
  projectId: number;

  @NumberType()
  tagId: number;
}
