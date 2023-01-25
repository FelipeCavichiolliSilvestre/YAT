import { ModuleError } from './module.error';

export class ResourceNotFoundError extends ModuleError {
  name = ResourceNotFoundError.name;
}
