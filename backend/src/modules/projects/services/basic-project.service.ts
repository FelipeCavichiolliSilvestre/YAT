import { Injectable } from '@nestjs/common';

import { iProjectRepository } from '@infra/database/interfaces';
import {
  EntityNotFoundError,
  UniqueConstraintViolationError,
} from '@infra/database/errors';
import { HandleDatabaseErrors } from '@infra/database/errors/handlers';

import { TagEntity } from '@modules/tags/entities';
import { TodoEntity } from '@modules/Todos/entities';
import { UserEntity } from '@modules/users/entities';

import { ProjectEntity } from '../entities';
import {
  CreateProjectInput,
  DeleteProjectInput,
  GetAvailableTagsInput,
  GetMembersInput,
  GetOneProjectInput,
  GetTodosInput,
  iProjectService,
  UpdateProjectInput,
} from '../interfaces/project.service.interface';

import { validatePlainObject } from '@lib/utils';

@Injectable()
export class BasicProjectService implements iProjectService {
  constructor(private projectRepository: iProjectRepository) {}

  @HandleDatabaseErrors(UniqueConstraintViolationError, EntityNotFoundError)
  async create(data: CreateProjectInput): Promise<ProjectEntity> {
    const { creatorUserId, name, description } = validatePlainObject(
      CreateProjectInput,
      data,
    );

    return this.projectRepository.createOne({
      name,
      description,
      membersIds: [creatorUserId],
    });
  }

  @HandleDatabaseErrors(EntityNotFoundError)
  async delete(data: DeleteProjectInput): Promise<void> {
    const { id } = validatePlainObject(DeleteProjectInput, data);

    await this.projectRepository.deleteOneById(id);
  }

  @HandleDatabaseErrors(UniqueConstraintViolationError, EntityNotFoundError)
  async update(id: number, data: UpdateProjectInput): Promise<ProjectEntity> {
    const { name, description } = validatePlainObject(UpdateProjectInput, data);

    return this.projectRepository.updateOneById(id, { name, description });
  }

  @HandleDatabaseErrors(EntityNotFoundError)
  async getOne(data: GetOneProjectInput): Promise<Partial<ProjectEntity>> {
    const { id } = validatePlainObject(GetOneProjectInput, data);

    return this.projectRepository.findOneById(id);
  }

  @HandleDatabaseErrors(EntityNotFoundError)
  async getAvailableTags(
    id: number,
    data: GetAvailableTagsInput,
  ): Promise<Partial<TagEntity>[]> {
    const { pagination } = validatePlainObject(GetAvailableTagsInput, data);

    return this.projectRepository.getAvailableTagsOfProject(id, {
      pagination,
    });
  }

  @HandleDatabaseErrors(EntityNotFoundError)
  async getTodos(
    id: number,
    data: GetTodosInput,
  ): Promise<Partial<TodoEntity>[]> {
    const { pagination } = validatePlainObject(GetTodosInput, data);

    return this.projectRepository.getTodosOfProject(id, {
      pagination,
      select: {
        id: true,
        tags: true,
        completed: true,
        name: true,
      },
    });
  }

  @HandleDatabaseErrors(EntityNotFoundError)
  async getMembers(
    id: number,
    data: GetMembersInput,
  ): Promise<Partial<UserEntity>[]> {
    const { pagination } = validatePlainObject(GetMembersInput, data);

    return this.projectRepository.getMembersOfProject(id, {
      pagination,
    });
  }
}
