import { TagType } from "./tag.type";

export type TodoType = {
  id: number;
  name: string;
  completed: boolean;
  tags: TagType[];
};
