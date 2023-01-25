import { Injectable } from '@nestjs/common';

import { TagEntity } from '@modules/tags/entities';
import { ProjectEntity } from '@modules/projects/entities';
import { TodoEntity } from '@modules/Todos/entities';
import { UserEntity } from '@modules/users/entities';

import {
  FindManyInputBase,
  iCrudRepository,
} from './crud.repository.interface';

import { FindManyTagsInput } from './tag.repository.interface';
import { FindManyTodosInput } from './todo.repository.interface';
import { FindManyUsersInput } from './user.repository.interface';

@Injectable()
export abstract class iProjectRepository extends iCrudRepository<
  ProjectEntity,
  CreateOneProjectInput,
  UpdateOneProjectInput,
  FindManyProjectsInput
> {
  abstract doesTagsBelongToProject(
    data: DoesTagsBelongToListInput,
  ): Promise<boolean>;

  abstract doesUserBelongToProject(
    data: DoesUsersBelongToListInput,
  ): Promise<boolean>;

  abstract getAvailableTagsOfProject(
    id: number,
    data: FindManyTagsInput,
  ): Promise<Partial<TagEntity>[]>;

  abstract getTodosOfProject(
    id: number,
    data: FindManyTodosInput,
  ): Promise<Partial<TodoEntity>[]>;

  abstract getMembersOfProject(
    id: number,
    data: FindManyUsersInput,
  ): Promise<Partial<UserEntity>[]>;

  abstract isUserOnlyMemberInProject(
    data: IsUserTheOnlyOneInProjectInput,
  ): Promise<boolean>;
}

export interface CreateOneProjectInput {
  name: string;
  description: string;
  membersIds?: number[];
}

export interface UpdateOneProjectInput {
  name?: string;
  description?: string;
}

export type FindManyProjectsInput = FindManyInputBase<ProjectEntity>;

export interface DoesTagsBelongToListInput {
  projectId: number;
  tagsIds: number[];
}

export interface DoesUsersBelongToListInput {
  projectId: number;
  userId: number;
}

export interface IsUserTheOnlyOneInProjectInput {
  projectId: number;
  userId: number;
}
