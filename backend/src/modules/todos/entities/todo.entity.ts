import { TagEntity } from '@modules/tags/entities';

export interface TodoEntity {
  id: number;
  name: string;
  completed: boolean;
  tags: TagEntity[];
}
