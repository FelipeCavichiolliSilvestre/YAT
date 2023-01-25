import { Prisma } from '@prisma/client';

import {
  ForeingKeyConstraintViolation,
  EntityNotFoundError,
  UniqueConstraintViolationError,
} from '@infra/database/errors';

import { HandleErrors } from '@lib/decorators';

function handlePrismaError(error: Prisma.PrismaClientKnownRequestError) {
  let field: string;

  switch (error.code) {
    case 'P2002':
      field = error.meta ? error.meta['target'][0] : 'unknown';

      throw new UniqueConstraintViolationError(field);

    case 'P2003':
      field = error.meta ? error.meta['target'][0] : 'unknown';

      throw new ForeingKeyConstraintViolation(field);

    case 'P2025':
      throw new EntityNotFoundError();
  }

  throw error;
}

export function HandleAllPrismaErrors(): MethodDecorator {
  return HandleErrors(handlePrismaError, Error);
}
