import { InvalidInputError } from '@shared/errors';
import { Constructor } from '@shared/types';

import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export function validatePlainObject<T extends object>(
  cls: Constructor<T>,
  plain: T,
): T {
  const obj = plainToInstance(cls, plain, {
    exposeDefaultValues: true,
    excludeExtraneousValues: true,
  });

  const errors = validateSync(obj);
  if (errors.length > 0) throw new InvalidInputError(errors);

  return obj;
}
