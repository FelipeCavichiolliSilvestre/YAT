import { ModuleError } from './module.error';
import { ValidationError } from 'class-validator';

export class InvalidInputError extends ModuleError {
  name = InvalidInputError.name;
  public messageList: string[] = [];

  constructor(errorList: ValidationError[], messageList?: string[]) {
    super('Invalid input');

    if (messageList) {
      this.messageList = messageList;
    }

    errorList.forEach((error) => {
      for (const key in error.constraints) {
        this.messageList.push(error.constraints[key]);
      }
    });
  }
}
