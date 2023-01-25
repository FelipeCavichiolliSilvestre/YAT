import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { iAuthenticationService } from '@modules/auth/interfaces';
import { ProjectClient } from '@modules/projects/gateways/sockets.types';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class JwtAuthWsGuard implements CanActivate {
  constructor(private authenticationService: iAuthenticationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: ProjectClient = context.switchToWs().getClient();
    const jwt = client.handshake.auth.token;

    try {
      const jwtPayload = await this.authenticationService.verifyJwt(jwt);
      // Append decoded jwt in client.data
      client.data.jwt = jwtPayload;
    } catch (error) {
      throw new WsException(error.message);
    }

    return true;
  }
}
