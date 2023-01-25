import { Injectable } from '@nestjs/common';

import { iInviteRepository } from '@infra/database/interfaces/invite.repository.interface';
import { EntityNotFoundError } from '@infra/database/errors';
import { HandleDatabaseErrors } from '@infra/database/errors/handlers';

import { ResourceNotFoundError } from '@shared/errors';

import { ProjectInviteEntity } from '../entities';

import { inviteConfig } from '@config/invite.config';
import * as crypto from 'crypto';
import { iInviteService } from '../interfaces';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class LinkInviteService implements iInviteService {
  constructor(private inviteRepository: iInviteRepository) {}

  @HandleDatabaseErrors(EntityNotFoundError)
  async createInvite(projectId: number): Promise<ProjectInviteEntity> {
    const expirationDate = new Date();
    // Add aproximatly the expiration time
    expirationDate.setSeconds(inviteConfig.expirationInSeconds);

    const code = crypto
      // 3 bytes per base64 character
      .randomBytes(inviteConfig.codeByteLength)
      .toString('base64url');

    const invite = await this.inviteRepository.createInvite({
      code,
      expirationDate,
      projectId,
    });

    return invite;
  }

  @HandleDatabaseErrors(EntityNotFoundError)
  async verifyInvite(code: string): Promise<ProjectInviteEntity> {
    const invite = await this.inviteRepository.getInvite(code);

    // If the invite was still not deleted, but it is expired,
    // act like it doesn't exist
    const now = new Date();
    if (invite.expirationDate < now) throw new ResourceNotFoundError();

    return invite;
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async deleteExpiredInvites() {
    await this.inviteRepository.removeAllExpiredInvites();
  }
}
