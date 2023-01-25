import { Injectable } from '@nestjs/common';

import { PrismaService } from '@infra/prisma/prisma.service';
import { HandleAllPrismaErrors } from '@infra/prisma/errors/handlers';

import { ProjectInviteEntity } from '@modules/projects/entities';

import {
  iInviteRepository,
  CreateInviteInput,
} from '../interfaces/invite.repository.interface';
import { EntityNotFoundError } from '../errors';

@Injectable()
export class InvitePrismaRepository implements iInviteRepository {
  constructor(private prisma: PrismaService) {}

  @HandleAllPrismaErrors()
  async removeAllExpiredInvites(): Promise<void> {
    await this.prisma.inviteLink.deleteMany({
      where: {
        expirationDate: {
          lt: new Date(),
        },
      },
    });
  }

  @HandleAllPrismaErrors()
  async createInvite(data: CreateInviteInput): Promise<ProjectInviteEntity> {
    const { code, expirationDate, projectId } = data;

    return this.prisma.inviteLink.create({
      data: {
        code,
        projectId,
        expirationDate,
      },
    });
  }

  @HandleAllPrismaErrors()
  async deleteInvite(inviteCode: string): Promise<void> {
    await this.prisma.inviteLink.delete({ where: { code: inviteCode } });
  }

  @HandleAllPrismaErrors()
  async getInvite(inviteCode: string): Promise<ProjectInviteEntity> {
    return this.prisma.inviteLink.findUnique({
      where: { code: inviteCode },
      rejectOnNotFound(): Error {
        throw new EntityNotFoundError('Invite');
      },
    });
  }
}
