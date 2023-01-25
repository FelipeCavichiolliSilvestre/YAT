import { ModuleError } from './module.error';

export class ImpossibleActionError extends ModuleError {
  name = ImpossibleActionError.name;

  constructor(message?: string) {
    super(message);
  }
}
