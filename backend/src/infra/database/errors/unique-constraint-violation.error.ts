import { DatabaseError } from './database.error';

export class UniqueConstraintViolationError extends DatabaseError {
  name = UniqueConstraintViolationError.name;

  constructor(public field: string) {
    super(`Unique constraint violation on field ${field}`);
  }
}
