import { RepeatedFieldError, ResourceNotFoundError } from '@shared/errors';
import { Constructor } from '@shared/types';

import {
  DatabaseError,
  EntityNotFoundError,
  UniqueConstraintViolationError,
} from '..';

import { HandleErrors } from '@lib/decorators/handle-errors.decorator';

function handleDatabaseError(error: DatabaseError) {
  if (error instanceof EntityNotFoundError) throw new ResourceNotFoundError();
  if (error instanceof UniqueConstraintViolationError)
    throw new RepeatedFieldError(error.field);
}

export function HandleDatabaseErrors(
  ...errorList: Constructor<DatabaseError>[]
): MethodDecorator {
  return HandleErrors(handleDatabaseError, ...errorList);
}
