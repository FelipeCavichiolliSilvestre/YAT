import { EntityNotFoundError } from '@infra/database/errors';
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

import { Jwt } from '@shared/decorators';
import { InvalidInputError, RepeatedFieldError } from '@shared/errors';
import { HandleModuleErrors } from '@shared/errors/handlers';
import { JwtAuthHttpGuard, ProjectHttpGuard } from '@shared/guards';

import { iProjectService } from '../interfaces';

@Controller('/projects')
@UseGuards(JwtAuthHttpGuard)
export class ProjectBaseController {
  constructor(private projectService: iProjectService) {}

  @Post('/')
  @HandleModuleErrors(InvalidInputError, RepeatedFieldError)
  async createProject(@Body() body: any, @Jwt() jwt: any) {
    return this.projectService.create({
      ...body,
      creatorUserId: jwt.id,
    });
  }

  @Get('/:projectId')
  @HandleModuleErrors(InvalidInputError, EntityNotFoundError)
  async getProject(@Param('projectId', ParseIntPipe) id: number) {
    return this.projectService.getOne({ id });
  }

  @Patch('/:projectId')
  @UseGuards(ProjectHttpGuard)
  @HandleModuleErrors(
    InvalidInputError,
    EntityNotFoundError,
    RepeatedFieldError,
  )
  async updateProject(
    @Param('projectId', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    return this.projectService.update(id, body);
  }

  @Delete('/:projectId')
  @HttpCode(204)
  @UseGuards(ProjectHttpGuard)
  @HandleModuleErrors(InvalidInputError, EntityNotFoundError)
  async deleteProject(@Param('projectId', ParseIntPipe) id: number) {
    await this.projectService.delete({
      id,
    });
  }
}
