import { Injectable } from '@nestjs/common';

import { iTagRepository } from '@infra/database/interfaces';
import {
  EntityNotFoundError,
  UniqueConstraintViolationError,
} from '@infra/database/errors';
import { HandleDatabaseErrors } from '@infra/database/errors/handlers';

import { TagEntity } from '../entities';
import {
  CreateTagInput,
  DeleteTagInput,
  GetOneTagInput,
  iTagService,
  UpdateTagInput,
} from '../interfaces/tag.service.interface';

import { validatePlainObject } from '@lib/utils';

@Injectable()
export class BasicTagService implements iTagService {
  constructor(private tagRepository: iTagRepository) {}

  @HandleDatabaseErrors(UniqueConstraintViolationError)
  async create(data: CreateTagInput): Promise<TagEntity> {
    const { color, name, projectId } = validatePlainObject(
      CreateTagInput,
      data,
    );

    return this.tagRepository.createOne({
      color,
      name,
      projectId: projectId,
    });
  }

  @HandleDatabaseErrors(EntityNotFoundError)
  async delete(data: DeleteTagInput): Promise<void> {
    const { id } = validatePlainObject(DeleteTagInput, data);

    await this.tagRepository.deleteOneById(id);
  }

  @HandleDatabaseErrors(EntityNotFoundError, UniqueConstraintViolationError)
  async update(id: number, data: UpdateTagInput): Promise<TagEntity> {
    const { color, name } = validatePlainObject(UpdateTagInput, data);

    return this.tagRepository.updateOneById(id, {
      color,
      name,
    });
  }

  @HandleDatabaseErrors(EntityNotFoundError)
  async getOne(data: GetOneTagInput): Promise<Partial<TagEntity>> {
    const { id } = validatePlainObject(GetOneTagInput, data);

    return this.tagRepository.findOneById(id);
  }
}
