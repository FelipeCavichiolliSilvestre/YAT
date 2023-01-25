import { Injectable } from '@nestjs/common';

import { PrismaService } from '@infra/prisma/prisma.service';
import { HandleAllPrismaErrors } from '@infra/prisma/errors/handlers';

import { ProjectEntity } from '@modules/projects/entities';
import { TagEntity } from '@modules/tags/entities';
import { TodoEntity } from '@modules/Todos/entities';
import { UserEntity } from '@modules/users/entities';

import {
  CreateOneProjectInput,
  DoesTagsBelongToListInput,
  DoesUsersBelongToListInput,
  FindManyProjectsInput,
  iProjectRepository,
  IsUserTheOnlyOneInProjectInput,
  UpdateOneProjectInput,
} from '../interfaces/project.repository.interface';
import { FindManyTagsInput } from '../interfaces/tag.repository.interface';
import { FindManyTodosInput } from '../interfaces/todo.repository.interface';
import { FindManyUsersInput } from '../interfaces/user.repository.interface';
import { Select } from '../types';
import { EntityNotFoundError } from '../errors';

import { convertSelectToBooleans } from './utils/convert-select-to-boleans';

@Injectable()
export class ProjectPrismaRepository implements iProjectRepository {
  constructor(private prisma: PrismaService) {}

  @HandleAllPrismaErrors()
  async isUserOnlyMemberInProject(
    data: IsUserTheOnlyOneInProjectInput,
  ): Promise<boolean> {
    const { projectId, userId } = data;

    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      select: {
        members: {
          select: {
            id: true,
          },
          take: 2,
        },
      },
      rejectOnNotFound(): Error {
        throw new EntityNotFoundError('Project');
      },
    });

    const thereIsOnlyOneMember = project.members.length === 1;
    if (!thereIsOnlyOneMember) return false;

    const userIsOnlyMember = project.members[0].id === userId;

    return userIsOnlyMember;
  }

  @HandleAllPrismaErrors()
  async getMembersOfProject(
    id: number,
    data: FindManyUsersInput,
  ): Promise<Partial<UserEntity>[]> {
    const { pagination, select, where } = data;

    const project = await this.prisma.project.findUnique({
      where: { id },
      select: {
        members: {
          where,
          select: select && convertSelectToBooleans(select),
          skip: pagination && pagination.limit * pagination.page,
          take: pagination && pagination.limit,
        },
      },
      rejectOnNotFound(): Error {
        throw new EntityNotFoundError('Project');
      },
    });

    return project.members;
  }

  @HandleAllPrismaErrors()
  async getTodosOfProject(
    id: number,
    data: FindManyTodosInput,
  ): Promise<Partial<TodoEntity>[]> {
    const { pagination, select, where } = data;

    const project = await this.prisma.project.findUnique({
      where: { id },
      select: {
        todos: {
          where,
          select: select && convertSelectToBooleans(select),
          skip: pagination && pagination.limit * pagination.page,
          take: pagination && pagination.limit,
          orderBy: {
            id: 'desc',
          },
        },
      },
      rejectOnNotFound(): Error {
        throw new EntityNotFoundError('User');
      },
    });

    return project.todos;
  }

  @HandleAllPrismaErrors()
  async getAvailableTagsOfProject(
    id: number,
    data: FindManyTagsInput,
  ): Promise<Partial<TagEntity>[]> {
    const { pagination, select, where } = data;

    const project = await this.prisma.project.findUnique({
      where: { id },
      select: {
        tags: {
          where,
          select: select && convertSelectToBooleans(select),
          skip: pagination && pagination.limit * pagination.page,
          take: pagination && pagination.limit,
        },
      },
      rejectOnNotFound(): Error {
        throw new EntityNotFoundError('Project');
      },
    });

    return project.tags;
  }

  @HandleAllPrismaErrors()
  async doesTagsBelongToProject(
    data: DoesTagsBelongToListInput,
  ): Promise<boolean> {
    const { projectId, tagsIds } = data;

    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
      select: {
        tags: {
          where: {
            id: {
              in: tagsIds,
            },
          },
        },
      },
      rejectOnNotFound(): Error {
        throw new EntityNotFoundError('Project');
      },
    });

    return project.tags.length === tagsIds.length;
  }

  @HandleAllPrismaErrors()
  async doesUserBelongToProject(
    data: DoesUsersBelongToListInput,
  ): Promise<boolean> {
    const { projectId, userId } = data;

    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
      select: {
        members: {
          where: {
            id: userId,
          },
        },
      },
      rejectOnNotFound(): Error {
        throw new EntityNotFoundError('Project');
      },
    });

    return project.members.length === 1;
  }

  @HandleAllPrismaErrors()
  async createOne(data: CreateOneProjectInput): Promise<ProjectEntity> {
    const { description, name, membersIds } = data;

    return this.prisma.project.create({
      data: {
        name,
        description,
        members: {
          connect: membersIds?.map((id) => {
            return { id };
          }),
        },
      },
    });
  }

  @HandleAllPrismaErrors()
  async deleteOneById(id: number): Promise<void> {
    await this.prisma.project.delete({ where: { id } });
  }

  @HandleAllPrismaErrors()
  async updateOneById(
    id: number,
    data: UpdateOneProjectInput,
  ): Promise<ProjectEntity> {
    const { name, description } = data;

    return this.prisma.project.update({
      where: { id },
      data: { name, description },
    });
  }

  @HandleAllPrismaErrors()
  async findOneById(
    id: number,
    select?: Select<ProjectEntity>,
  ): Promise<Partial<ProjectEntity>> {
    return this.prisma.project.findUnique({
      where: {
        id,
      },
      select: select && convertSelectToBooleans(select),
      rejectOnNotFound(): Error {
        throw new EntityNotFoundError('Project');
      },
    });
  }

  @HandleAllPrismaErrors()
  async findMany(
    data: FindManyProjectsInput,
  ): Promise<Partial<ProjectEntity>[]> {
    const { pagination, select, where } = data;

    return this.prisma.project.findMany({
      select: select && convertSelectToBooleans(select),
      skip: pagination && pagination.limit * pagination.page,
      take: pagination && pagination.limit,
      where,
    });
  }
}
