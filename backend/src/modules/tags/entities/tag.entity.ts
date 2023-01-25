import { ColorsEnum } from './colors.enum';

export interface TagEntity {
  id: number;
  name: string;
  color: string | ColorsEnum;
}
