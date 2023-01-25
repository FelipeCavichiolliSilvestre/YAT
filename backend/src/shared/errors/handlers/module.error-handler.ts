import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Constructor } from '@shared/types';

import { ModuleError, RepeatedFieldError, ResourceNotFoundError } from '../';
import { ImpossibleActionError } from '../impossible-action.error';
import { InvalidInputError } from '../invalid-input.error';

import { HandleErrors } from '@lib/decorators/handle-errors.decorator';
import {
  UnauthenticatedUserError,
  UnauthorizedUserError,
} from '@modules/auth/error';

function handleModuleError(error: ModuleError) {
  if (error instanceof ImpossibleActionError)
    throw new BadRequestException(error.message);
  else if (error instanceof InvalidInputError)
    throw new BadRequestException(error.messageList);
  else if (error instanceof RepeatedFieldError)
    throw new UnprocessableEntityException(error.message);
  else if (error instanceof ResourceNotFoundError)
    throw new NotFoundException();
  else if (error instanceof UnauthenticatedUserError)
    throw new UnauthorizedException(error.message);
  else if (error instanceof UnauthorizedUserError)
    throw new UnauthorizedException(error.message);
}

export function HandleModuleErrors(
  ...errorList: Constructor<ModuleError>[]
): MethodDecorator {
  return HandleErrors(handleModuleError, ...errorList);
}
