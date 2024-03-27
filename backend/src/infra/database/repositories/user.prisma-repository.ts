import { Injectable } from '@nestjs/common';

import { HandleAllPrismaErrors } from '@infra/prisma/errors/handlers';
import { PrismaService } from '@infra/prisma/prisma.service';

import { UserEntity } from '@modules/users/entities';

import {
  ConnectOrDisconnectUserToProject,
  CreateOneUserInput,
  FindManyUsersInput,
  iUserRepository,
} from '../interfaces/user.repository.interface';
import { Select } from '../types';
import { EntityNotFoundError } from '../errors';

import { convertSelectToBooleans } from './utils/convert-select-to-boleans';
import { FindManyProjectsInput } from '../interfaces/project.repository.interface';

@Injectable()
export class UserPrismaRepository implements iUserRepository {
  constructor(private prisma: PrismaService) {}

  @HandleAllPrismaErrors()
  async findProjectsOfUserById(id: number, data: FindManyProjectsInput) {
    const { pagination, select, where } = data;

    return this.prisma.project.findMany({
      where: {
        ...where,
        members: {
          some: {
            id,
          },
        },
      },
      select: select && convertSelectToBooleans(select),
      skip: pagination && pagination.limit * pagination.page,
      take: pagination && pagination.limit,
      orderBy: {
        id: 'desc',
      },
    });
  }

  @HandleAllPrismaErrors()
  async connectUserToProject(
    data: ConnectOrDisconnectUserToProject,
  ): Promise<void> {
    const { projectId, userId } = data;

    await this.prisma.project.update({
      where: { id: projectId },
      data: {
        members: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  @HandleAllPrismaErrors()
  async disconnectUserToProject(
    data: ConnectOrDisconnectUserToProject,
  ): Promise<void> {
    const { projectId, userId } = data;

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        projects: {
          disconnect: { id: projectId },
        },
      },
    });
  }

  @HandleAllPrismaErrors()
  async createOne(data: CreateOneUserInput): Promise<UserEntity> {
    const { email, name, passwordHash } = data;

    return this.prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
      },
    });
  }

  @HandleAllPrismaErrors()
  async deleteOneById(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  @HandleAllPrismaErrors()
  async updateOneById(
    id: number,
    data: Partial<CreateOneUserInput>,
  ): Promise<UserEntity> {
    const { email, name, passwordHash } = data;

    return this.prisma.user.update({
      where: { id },
      data: {
        email,
        name,
        passwordHash,
      },
    });
  }

  @HandleAllPrismaErrors()
  async findOneById(
    id: number,
    select?: Select<UserEntity>,
  ): Promise<Partial<UserEntity>> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: select && convertSelectToBooleans(select),
    });

    if (!user) throw new EntityNotFoundError('User');
    return user;
  }

  @HandleAllPrismaErrors()
  async findOneByEmail(email: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new EntityNotFoundError('User');
    return user;
  }

  async findMany(data: FindManyUsersInput): Promise<Partial<UserEntity>[]> {
    const { pagination, select, where } = data;

    return this.prisma.user.findMany({
      select: select && convertSelectToBooleans(select),
      skip: pagination && pagination.limit * pagination.page,
      take: pagination && pagination.limit,
      where,
    });
  }
}
