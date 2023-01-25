import { Pagination, Select, Where } from '../types';

export abstract class iCrudRepository<
  Entity,
  CreateOneInput,
  UpdateOneInput = Partial<CreateOneInput>,
  FindManyInput = FindManyInputBase<Entity>,
> {
  abstract createOne(data: CreateOneInput): Promise<Entity>;
  abstract updateOneById(id: number, data: UpdateOneInput): Promise<Entity>;
  abstract deleteOneById(id: number): Promise<void>;
  abstract findOneById(
    id: number,
    select?: Select<Entity>,
  ): Promise<Partial<Entity>>;
  abstract findMany(data: FindManyInput): Promise<Partial<Entity>[]>;
}

export interface FindManyInputBase<Entity> {
  select?: Select<Entity>;
  pagination?: Pagination;
  where?: Where<Entity>;
}
