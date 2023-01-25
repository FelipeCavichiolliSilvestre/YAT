import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { iInviteService } from '../interfaces';
import { JwtAuthHttpGuard, ProjectHttpGuard } from '@shared/guards';
import { Jwt } from '@shared/decorators';
import { JwtPayload } from '@modules/auth/types';
import { iUserService } from '@modules/users/interfaces';

@Controller('/')
@UseGuards(JwtAuthHttpGuard)
export class ProjectInviteController {
  constructor(
    private inviteService: iInviteService,
    private userService: iUserService,
  ) {}

  @UseGuards(ProjectHttpGuard)
  @Post('/projects/:projectId/invites')
  async createInvite(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.inviteService.createInvite(projectId);
  }

  @Put('/invites/:inviteCode')
  async useInvite(
    @Param('inviteCode') inviteCode: string,
    @Jwt() jwt: JwtPayload,
  ) {
    const invite = await this.inviteService.verifyInvite(inviteCode);

    await this.userService.enterProject({
      projectId: invite.projectId,
      userId: jwt.id,
    });

    return invite;
  }
}
