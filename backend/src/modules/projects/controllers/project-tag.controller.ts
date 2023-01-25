import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthHttpGuard, ProjectHttpGuard } from '@shared/guards';
import { Pagination } from '@shared/decorators';
import { InvalidInputError, ResourceNotFoundError } from '@shared/errors';
import { HandleModuleErrors } from '@shared/errors/handlers';

import { iTagService } from '@modules/tags/interfaces';

import { iProjectService } from '../interfaces';
import { ProjectGateway } from '../gateways';

@Controller('/projects/:projectId/tags')
@UseGuards(JwtAuthHttpGuard, ProjectHttpGuard)
export class ProjectTagController {
  constructor(
    private projectService: iProjectService,
    private tagService: iTagService,
    private projectGateway: ProjectGateway,
  ) {}

  @Get('/')
  @HandleModuleErrors(InvalidInputError, ResourceNotFoundError)
  async getTagsOfProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Pagination() pagination: any,
  ) {
    return this.projectService.getAvailableTags(projectId, {
      pagination,
    });
  }

  @Post('/')
  @HandleModuleErrors(InvalidInputError, ResourceNotFoundError)
  async createTag(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() body: any,
  ) {
    const tag = await this.tagService.create({
      ...body,
      projectId,
    });

    this.projectGateway.broadcastTagCreation(projectId, tag);

    return tag;
  }

  @Get('/:tagId')
  @HandleModuleErrors(InvalidInputError, ResourceNotFoundError)
  async getTag(@Param('tagId', ParseIntPipe) tagId: number) {
    return this.tagService.getOne({
      id: tagId,
    });
  }

  @Patch('/:tagId')
  @HandleModuleErrors(InvalidInputError, ResourceNotFoundError)
  async updateTag(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('tagId', ParseIntPipe) tagId: number,
    @Body() body: any,
  ) {
    const tag = await this.tagService.update(tagId, body);

    this.projectGateway.broadcastTagUpdate(projectId, tag);

    return tag;
  }

  @Delete('/:tagId')
  @HttpCode(204)
  @HandleModuleErrors(InvalidInputError, ResourceNotFoundError)
  async deleteTag(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('tagId', ParseIntPipe) tagId: number,
  ) {
    await this.tagService.delete({ id: tagId });
    this.projectGateway.broadcastTagDeletion({ projectId, tagId });
  }
}
