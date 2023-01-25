import { ModuleError } from '@shared/errors';

export class UnauthorizedUserError extends ModuleError {
  name = UnauthorizedUserError.name;
}
