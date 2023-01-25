import { TagEntity } from '@modules/tags/entities';
import { Injectable } from '@nestjs/common';

import {
  FindManyInputBase,
  iCrudRepository,
} from './crud.repository.interface';

@Injectable()
export abstract class iTagRepository extends iCrudRepository<
  TagEntity,
  CreateOneTagInput,
  UpdateOneTagInput,
  FindManyTagsInput
> {}

export interface CreateOneTagInput {
  name: string;
  color: string;
  projectId: number;
}

export interface UpdateOneTagInput {
  name?: string;
  color?: string;
}

export type FindManyTagsInput = FindManyInputBase<TagEntity>;
