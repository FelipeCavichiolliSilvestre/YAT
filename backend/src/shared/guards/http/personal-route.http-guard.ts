import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class PersonalRouteHttpGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.params['userId'];
    const jwt = request.jwt;

    if (jwt === undefined) {
      throw new Error(
        `${PersonalRouteHttpGuard.name} requires a jwt property appended in the request`,
      );
    }
    if (userId === undefined) {
      throw new Error(
        `${PersonalRouteHttpGuard.name} requires the param /:userId in the route`,
      );
    }

    // == and not === because request.params are strings
    return userId == jwt.id;
  }
}
