import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { iAuthenticationService } from '@modules/auth/interfaces';

@Injectable()
export class JwtAuthHttpGuard implements CanActivate {
  constructor(private authenticationService: iAuthenticationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwt = this.extractJwtFromBearerToken(request);

    try {
      const decodedJwt = await this.authenticationService.verifyJwt(jwt);
      // Append decoded jwt in request
      request.jwt = decodedJwt;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }

    return true;
  }

  private extractJwtFromBearerToken(request: any): string {
    const bearerToken = request.headers.authorization;

    if (bearerToken == undefined)
      throw new UnauthorizedException('authorization header is empty');

    if (!bearerToken.startsWith('Bearer '))
      throw new UnauthorizedException(
        'authorization header is not a bearer token',
      );

    return bearerToken.slice(7);
  }
}
