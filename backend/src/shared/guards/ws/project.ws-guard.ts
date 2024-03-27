import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

import { EntityNotFoundError } from '@infra/database/errors';
import { HandleDatabaseErrors } from '@infra/database/errors/handlers';

import { ResourceNotFoundError } from '@shared/errors';
import { HandleModuleErrors } from '@shared/errors/handlers';

import { iAuthorizationService } from '@modules/auth/interfaces';
import { UnauthorizedUserError } from '@modules/auth/error';
import { ProjectClient } from '@modules/projects/gateways/sockets.types';

@Injectable()
export class ProjectWsGuard implements CanActivate {
  constructor(private authorizationService: iAuthorizationService) {}

  @HandleModuleErrors(ResourceNotFoundError, UnauthorizedUserError)
  @HandleDatabaseErrors(EntityNotFoundError)
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: ProjectClient = context.switchToWs().getClient();
    const jwt = client.data.jwt;
    const projectId = Number(client.handshake.query.projectId);

    if (jwt === undefined) {
      throw new Error(
        `${ProjectWsGuard.name} requires a jwt property appended in client.data`,
      );
    }
    if (projectId == undefined || Number.isNaN(projectId)) {
      throw new WsException('projectId neded in handshake query');
    }

    try {
      await this.authorizationService.checkUserPermissionsForProject({
        projectId,
        userId: jwt.id,
      });

      client.data.projectId = projectId;
    } catch (error) {
      throw new WsException(error.message);
    }

    return true;
  }
}
