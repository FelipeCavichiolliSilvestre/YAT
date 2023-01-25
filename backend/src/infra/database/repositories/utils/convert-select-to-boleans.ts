import { Select } from '@infra/database/types';

export function convertSelectToBooleans<T>(select: Select<T>): Select<T> {
  Object.keys(select).map(function (key) {
    if (select[key] instanceof Object)
      select[key] = convertSelectToBooleans(select[key]);
    else select[key] = Boolean(select[key]);
  });

  return select;
}
