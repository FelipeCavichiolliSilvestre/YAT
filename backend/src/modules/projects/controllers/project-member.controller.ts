import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthHttpGuard, ProjectHttpGuard } from '@shared/guards';
import { Select, Pagination } from '@shared/decorators';
import { InvalidInputError, ResourceNotFoundError } from '@shared/errors';
import { HandleModuleErrors } from '@shared/errors/handlers';

import { iProjectService } from '@modules/projects/interfaces';

import { iUserService } from '../../users/interfaces';

@Controller('/projects/:projectId/members')
@UseGuards(JwtAuthHttpGuard)
export class ProjectMemberController {
  constructor(
    private projectService: iProjectService,
    private userService: iUserService,
  ) {}

  @Get('/')
  @HandleModuleErrors(InvalidInputError)
  async getMembersOfProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Pagination() pagination: any,
  ) {
    return this.projectService.getMembers(projectId, {
      pagination,
    });
  }

  @Put('/:userId')
  @HttpCode(204)
  @UseGuards(ProjectHttpGuard)
  @HandleModuleErrors(ResourceNotFoundError)
  async addMemberToProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    await this.userService.enterProject({
      projectId,
      userId,
    });
  }

  @Delete('/:userId')
  @UseGuards(ProjectHttpGuard)
  async removeMemberToProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    await this.userService.exitProject({
      projectId,
      userId,
    });
  }
}
