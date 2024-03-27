import { Injectable } from '@nestjs/common';

import { PrismaService } from '@infra/prisma/prisma.service';
import { HandleAllPrismaErrors } from '@infra/prisma/errors/handlers';

import { TodoEntity } from '@modules/todos/entities';

import {
  AlterTagsOfTodoInput,
  CreateOneTodoInput,
  FindManyTodosInput,
  iTodoRepository,
  UpdateOneTodoInput,
} from '../interfaces/todo.repository.interface';
import { Select } from '../types';
import { EntityNotFoundError } from '../errors';

import { convertSelectToBooleans } from './utils/convert-select-to-boleans';

@Injectable()
export class TodoPrismaRepository implements iTodoRepository {
  constructor(private prisma: PrismaService) {}

  async disconectTagsToTodo(data: AlterTagsOfTodoInput): Promise<TodoEntity> {
    const { tagsIds, todoId } = data;

    return this.prisma.todo.update({
      where: { id: todoId },
      data: {
        tags: {
          disconnect: tagsIds?.map((id) => {
            return { id };
          }),
        },
      },
      include: {
        tags: true,
      },
    });
  }

  @HandleAllPrismaErrors()
  async connectTagsToTodo(data: AlterTagsOfTodoInput): Promise<TodoEntity> {
    const { tagsIds, todoId } = data;

    return this.prisma.todo.update({
      where: { id: todoId },
      data: {
        tags: {
          connect: tagsIds?.map((id) => {
            return { id };
          }),
        },
      },
      include: {
        tags: true,
      },
    });
  }

  @HandleAllPrismaErrors()
  async createOne(data: CreateOneTodoInput): Promise<TodoEntity> {
    const { projectId, name, completed, tagsIds } = data;

    return this.prisma.todo.create({
      data: {
        name,
        completed,
        projectId,
        tags: {
          connect: tagsIds?.map((id) => {
            return { id };
          }),
        },
      },
      include: {
        tags: true,
      },
    });
  }

  @HandleAllPrismaErrors()
  async deleteOneById(id: number): Promise<void> {
    await this.prisma.todo.delete({ where: { id } });
  }

  @HandleAllPrismaErrors()
  async updateOneById(
    id: number,
    data: UpdateOneTodoInput,
  ): Promise<TodoEntity> {
    const { completed, name } = data;

    return this.prisma.todo.update({
      where: { id },
      data: { name, completed },
      include: { tags: true },
    });
  }

  @HandleAllPrismaErrors()
  async findOneById(
    id: number,
    select?: Select<TodoEntity>,
  ): Promise<Partial<TodoEntity>> {
    return this.prisma.todo.findUnique({
      where: { id },
      select: select && convertSelectToBooleans(select),
      rejectOnNotFound(): Error {
        throw new EntityNotFoundError('Todo');
      },
    });
  }

  async findMany(data: FindManyTodosInput): Promise<Partial<TodoEntity>[]> {
    const { pagination, select, where } = data;

    return this.prisma.todo.findMany({
      select: select && convertSelectToBooleans(select),
      skip: pagination && pagination.limit * pagination.page,
      take: pagination && pagination.limit,
      where,
    });
  }
}
