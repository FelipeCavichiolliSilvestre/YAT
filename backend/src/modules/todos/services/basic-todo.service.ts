import { Injectable } from '@nestjs/common';

import {
  iProjectRepository,
  iTodoRepository,
} from '@infra/database/interfaces';
import {
  EntityNotFoundError,
  UniqueConstraintViolationError,
} from '@infra/database/errors';
import { HandleDatabaseErrors } from '@infra/database/errors/handlers';
import { DoesTagsBelongToListInput } from '@infra/database/interfaces/project.repository.interface';

import { TodoEntity } from '../entities';
import {
  CreateTodoInput,
  DeleteTodoInput,
  GetOneTodoInput,
  InsertOrRemoveTagInput,
  iTodoService,
  UpdateTodoInput,
} from '../interfaces/todo.service.interface';

import { validatePlainObject } from '@lib/utils';
import { ImpossibleActionError } from '@shared/errors';

@Injectable()
export class BasicTodoService implements iTodoService {
  constructor(
    private todoRepository: iTodoRepository,
    private projectRepository: iProjectRepository,
  ) {}

  @HandleDatabaseErrors(UniqueConstraintViolationError, EntityNotFoundError)
  async create(data: CreateTodoInput): Promise<TodoEntity> {
    const { name, completed, projectId, tagsIds } = validatePlainObject(
      CreateTodoInput,
      data,
    );

    if (tagsIds)
      await this.validateIfTagBelongsToList({
        projectId,
        tagsIds,
      });

    return this.todoRepository.createOne({
      name,
      completed,
      projectId,
      tagsIds,
    });
  }

  @HandleDatabaseErrors(EntityNotFoundError)
  async delete(data: DeleteTodoInput): Promise<void> {
    const { id } = validatePlainObject(DeleteTodoInput, data);

    await this.todoRepository.deleteOneById(id);
  }

  @HandleDatabaseErrors(EntityNotFoundError, UniqueConstraintViolationError)
  async update(id: number, data: UpdateTodoInput): Promise<TodoEntity> {
    const { completed, name } = validatePlainObject(UpdateTodoInput, data);

    return this.todoRepository.updateOneById(id, {
      name,
      completed,
    });
  }

  @HandleDatabaseErrors(EntityNotFoundError)
  async getOne(data: GetOneTodoInput): Promise<Partial<TodoEntity>> {
    const { id } = validatePlainObject(GetOneTodoInput, data);

    return this.todoRepository.findOneById(id);
  }

  @HandleDatabaseErrors(EntityNotFoundError)
  async insertTag(data: InsertOrRemoveTagInput): Promise<TodoEntity> {
    const { tagId, todoId, projectId } = validatePlainObject(
      InsertOrRemoveTagInput,
      data,
    );

    await this.validateIfTagBelongsToList({
      projectId,
      tagsIds: [tagId],
    });

    return this.todoRepository.connectTagsToTodo({
      todoId,
      tagsIds: [tagId],
    });
  }

  @HandleDatabaseErrors(EntityNotFoundError)
  async removeTag(data: InsertOrRemoveTagInput): Promise<TodoEntity> {
    const { tagId, todoId } = validatePlainObject(InsertOrRemoveTagInput, data);

    return this.todoRepository.disconectTagsToTodo({
      todoId,
      tagsIds: [tagId],
    });
  }

  private async validateIfTagBelongsToList(
    data: DoesTagsBelongToListInput,
  ): Promise<void> {
    const tagsBelogsToList =
      await this.projectRepository.doesTagsBelongToProject(data);

    if (!tagsBelogsToList)
      throw new ImpossibleActionError('tags does not belong to this list');
  }
}
