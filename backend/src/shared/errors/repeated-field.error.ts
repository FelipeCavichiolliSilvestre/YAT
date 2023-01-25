import { ModuleError } from './module.error';

export class RepeatedFieldError extends ModuleError {
  name = RepeatedFieldError.name;

  constructor(public repeatedFieldName: string, message?: string) {
    super(message ? message : `${repeatedFieldName} alredy exists`);
  }
}
