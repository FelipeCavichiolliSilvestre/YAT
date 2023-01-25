import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';

import { iAuthenticationService } from '@modules/auth/interfaces';
import { UnauthorizedUserError } from '@modules/auth/error';
import { EntityNotFoundError } from '@infra/database/errors';

@Injectable()
export class LoginAuthHttpGuard implements CanActivate {
  constructor(private authenticationService: iAuthenticationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body;

    if (email == undefined)
      throw new UnauthorizedException('email is not present');
    if (password == undefined)
      throw new UnauthorizedException('password is not present');

    try {
      const user = await this.authenticationService.login({ email, password });

      // Append user object to request
      request.user = user;
    } catch (error) {
      if (error instanceof UnauthorizedUserError)
        throw new UnauthorizedException(error.message);
      if (error instanceof EntityNotFoundError)
        throw new NotFoundException(error.message);

      throw error;
    }

    return true;
  }
}
