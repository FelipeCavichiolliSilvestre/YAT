import { ModuleError } from './module.error';

export class UnverifiedUserError extends ModuleError {
  name = UnverifiedUserError.name;

  constructor(public readonly payload: UnverifiedUserErrorPayload) {
    payload.message = payload.message ?? 'User is not verified';
    super(payload.message);
  }
}

export type UnverifiedUserErrorPayload = {
  user: {
    id: number;
    email: string;
  };
  message?: string;
};
