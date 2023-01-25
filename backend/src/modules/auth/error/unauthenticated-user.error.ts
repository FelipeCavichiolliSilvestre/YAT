import { ModuleError } from '@shared/errors';

export class UnauthenticatedUserError extends ModuleError {
  name = UnauthenticatedUserError.name;
}
