import { Injectable } from '@nestjs/common';

import { ProjectInviteEntity } from '../entities';

@Injectable()
export abstract class iInviteService {
  abstract createInvite(projectId: number): Promise<ProjectInviteEntity>;
  abstract deleteExpiredInvites(): Promise<void>;

  abstract verifyInvite(code: string): Promise<ProjectInviteEntity>;
}
