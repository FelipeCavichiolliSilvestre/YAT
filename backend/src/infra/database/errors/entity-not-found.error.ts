import { DatabaseError } from './database.error';

export class EntityNotFoundError extends DatabaseError {
  name = EntityNotFoundError.name;

  constructor(entityName?: string, message?: string) {
    super(
      message
        ? message
        : entityName
        ? `${entityName} entity was not found`
        : 'One or more entities was not found',
    );
  }
}
