import { DatabaseError } from './database.error';

export class ForeingKeyConstraintViolation extends DatabaseError {
  name = ForeingKeyConstraintViolation.name;

  constructor(public field: string) {
    super(`Foreing key constraint violation on the field: ${field}`);
  }
}
