export class DatabaseError extends Error {
  name = DatabaseError.name;

  constructor(message: string) {
    super(message);
  }
}
