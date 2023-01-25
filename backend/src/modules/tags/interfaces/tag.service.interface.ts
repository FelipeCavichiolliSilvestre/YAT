import { Injectable } from '@nestjs/common';

import { ColorsEnum, TagEntity } from '../entities';

import {
  NumberType,
  OptionalStringType,
  StringType,
  OptionalEnumType,
  EnumType,
} from '@lib/decorators';
import { Length } from 'class-validator';

@Injectable()
export abstract class iTagService {
  abstract create(data: CreateTagInput): Promise<TagEntity>;
  abstract delete(data: DeleteTagInput): Promise<void>;
  abstract update(id: number, data: UpdateTagInput): Promise<TagEntity>;
  abstract getOne(data: GetOneTagInput): Promise<Partial<TagEntity>>;
}

export class CreateTagInput {
  @StringType()
  @Length(2, 10)
  name: string;

  @EnumType(ColorsEnum)
  color: string | ColorsEnum;

  @NumberType()
  projectId: number;
}

export class DeleteTagInput {
  @NumberType()
  id: number;
}

export class UpdateTagInput {
  @OptionalStringType()
  @Length(2, 10)
  name?: string;

  @OptionalEnumType(ColorsEnum)
  color?: string | ColorsEnum;
}

export class GetOneTagInput {
  @NumberType()
  id: number;
}
