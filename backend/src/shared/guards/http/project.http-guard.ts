import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { EntityNotFoundError } from '@infra/database/errors';
import { HandleDatabaseErrors } from '@infra/database/errors/handlers';

import { ResourceNotFoundError } from '@shared/errors';
import { HandleModuleErrors } from '@shared/errors/handlers';

import { iAuthorizationService } from '@modules/auth/interfaces';
import { UnauthorizedUserError } from '@modules/auth/error';

@Injectable()
export class ProjectHttpGuard implements CanActivate {
  constructor(private authorizationService: iAuthorizationService) {}

  @HandleModuleErrors(ResourceNotFoundError, UnauthorizedUserError)
  @HandleDatabaseErrors(EntityNotFoundError)
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const projectId = Number(request.params['projectId']);
    const jwt = request.jwt;

    if (jwt === undefined) {
      throw new Error(
        `${ProjectHttpGuard.name} requires a jwt property appended in the request`,
      );
    }
    if (projectId === undefined) {
      throw new Error(
        `${ProjectHttpGuard.name} requires the param /:projectId in the route`,
      );
    }

    await this.authorizationService.checkUserPermissionsForProject({
      projectId,
      userId: jwt.id,
    });

    return true;
  }
}
