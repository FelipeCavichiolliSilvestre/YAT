import { Injectable } from '@nestjs/common';

import { PrismaService } from '@infra/prisma/prisma.service';
import { HandleAllPrismaErrors } from '@infra/prisma/errors/handlers';

import { TagEntity } from '@modules/tags/entities';

import {
  CreateOneTagInput,
  FindManyTagsInput,
  iTagRepository,
  UpdateOneTagInput,
} from '../interfaces/tag.repository.interface';
import { Select } from '../types';
import { EntityNotFoundError } from '../errors';

import { convertSelectToBooleans } from './utils/convert-select-to-boleans';

@Injectable()
export class TagPrismaRepository implements iTagRepository {
  constructor(private prisma: PrismaService) {}

  @HandleAllPrismaErrors()
  async createOne(data: CreateOneTagInput): Promise<TagEntity> {
    const { color, name, projectId } = data;

    return this.prisma.tag.create({
      data: { color, name, projectId },
    });
  }

  @HandleAllPrismaErrors()
  async deleteOneById(id: number): Promise<void> {
    await this.prisma.tag.delete({ where: { id } });
  }

  @HandleAllPrismaErrors()
  async updateOneById(id: number, data: UpdateOneTagInput): Promise<TagEntity> {
    const { color, name } = data;

    return this.prisma.tag.update({
      where: { id },
      data: {
        color,
        name,
      },
    });
  }

  @HandleAllPrismaErrors()
  async findOneById(
    id: number,
    select?: Select<TagEntity>,
  ): Promise<Partial<TagEntity>> {
    return this.prisma.tag.findUnique({
      where: { id },
      select: select && convertSelectToBooleans(select),
      rejectOnNotFound(): Error {
        throw new EntityNotFoundError('Tag');
      },
    });
  }

  async findMany(data: FindManyTagsInput): Promise<Partial<TagEntity>[]> {
    const { pagination, select, where } = data;

    return this.prisma.tag.findMany({
      select: select && convertSelectToBooleans(select),
      skip: pagination && pagination.limit * pagination.page,
      take: pagination && pagination.limit,
      where,
    });
  }
}
