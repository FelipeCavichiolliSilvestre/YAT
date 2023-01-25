import { ProjectInviteEntity } from '@modules/projects/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class iInviteRepository {
  abstract getInvite(inviteCode: string): Promise<ProjectInviteEntity>;
  abstract deleteInvite(inviteCode: string): Promise<void>;
  abstract createInvite(data: CreateInviteInput): Promise<ProjectInviteEntity>;
  abstract removeAllExpiredInvites(): Promise<void>;
}

export interface CreateInviteInput {
  code: string;
  projectId: number;
  expirationDate: Date;
}
