import { Injectable } from '@nestjs/common';

import { PageLimitPagination } from '@shared/validation';

import { TodoEntity } from '@modules/todos/entities';
import { TagEntity } from '@modules/tags/entities';
import { UserEntity } from '@modules/users/entities';

import { ProjectEntity } from '../entities';

import {
  NumberType,
  OptionalNestedType,
  OptionalStringType,
  StringType,
} from '@lib/decorators';
import { Length } from 'class-validator';

@Injectable()
export abstract class iProjectService {
  abstract create(data: CreateProjectInput): Promise<ProjectEntity>;
  abstract delete(data: DeleteProjectInput): Promise<void>;
  abstract update(id: number, data: UpdateProjectInput): Promise<ProjectEntity>;
  abstract getOne(data: GetOneProjectInput): Promise<Partial<ProjectEntity>>;

  abstract getAvailableTags(
    id: number,
    data: GetAvailableTagsInput,
  ): Promise<Partial<TagEntity>[]>;
  abstract getTodos(
    id: number,
    data: GetTodosInput,
  ): Promise<Partial<TodoEntity>[]>;
  abstract getMembers(
    id: number,
    data: GetMembersInput,
  ): Promise<Partial<UserEntity>[]>;
}

export class CreateProjectInput {
  @StringType()
  @Length(2, 40)
  name: string;

  @StringType()
  @Length(5, 255)
  description: string;

  @NumberType()
  creatorUserId: number;
}

export class DeleteProjectInput {
  @NumberType()
  id: number;
}

export class UpdateProjectInput {
  @OptionalStringType()
  @Length(2, 40)
  name?: string;

  @OptionalStringType()
  @Length(5, 130)
  description?: string;
}

export class GetOneProjectInput {
  @NumberType()
  id: number;
}

export class GetAvailableTagsInput {
  @OptionalNestedType(PageLimitPagination)
  pagination?: PageLimitPagination;
}

export class GetMembersInput {
  @OptionalNestedType(PageLimitPagination)
  pagination?: PageLimitPagination;
}

export class GetTodosInput {
  @OptionalNestedType(PageLimitPagination)
  pagination?: PageLimitPagination;
}
