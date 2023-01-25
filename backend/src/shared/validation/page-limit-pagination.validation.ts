import { NumberType } from '@lib/decorators';
import { Max, Min } from 'class-validator';

export class PageLimitPagination {
  @NumberType()
  @Min(0)
  page = 0;

  @NumberType()
  @Min(1)
  @Max(15)
  limit = 10;
}
