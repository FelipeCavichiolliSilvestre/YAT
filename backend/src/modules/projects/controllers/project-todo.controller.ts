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
  Put,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthHttpGuard, ProjectHttpGuard } from '@shared/guards';
import { Select, Pagination } from '@shared/decorators';
import { InvalidInputError, ResourceNotFoundError } from '@shared/errors';
import { HandleModuleErrors } from '@shared/errors/handlers';

import { iTodoService } from '@modules/todos/interfaces';

import { iProjectService } from '../interfaces';
import { ProjectGateway } from '../gateways';

@Controller('/projects/:projectId/todos')
@UseGuards(JwtAuthHttpGuard, ProjectHttpGuard)
export class ProjectTodoController {
  constructor(
    private projectService: iProjectService,
    private todoService: iTodoService,
    private projectGateway: ProjectGateway,
  ) {}

  @Get('/')
  @HandleModuleErrors(InvalidInputError, ResourceNotFoundError)
  async getTodosOfProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Pagination() pagination: any,
  ) {
    return this.projectService.getTodos(projectId, {
      pagination,
    });
  }

  @Post('/')
  @HandleModuleErrors(InvalidInputError, ResourceNotFoundError)
  async createTodo(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() body: any,
  ) {
    const todo = await this.todoService.create({
      ...body,
      projectId,
    });

    this.projectGateway.broadcastTodoCreation(projectId, todo);

    return todo;
  }

  @Get('/:todoId')
  @HandleModuleErrors(InvalidInputError, ResourceNotFoundError)
  async getTodo(@Param('todoId', ParseIntPipe) todoId: number) {
    return this.todoService.getOne({
      id: todoId,
    });
  }

  @Patch('/:todoId')
  @HandleModuleErrors(InvalidInputError, ResourceNotFoundError)
  async updateTodo(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('todoId', ParseIntPipe) todoId: number,
    @Body() body: any,
  ) {
    const todo = await this.todoService.update(todoId, body);

    this.projectGateway.broadcastTodoUpdate(projectId, todo);

    return todo;
  }

  @Delete('/:todoId')
  @HttpCode(204)
  @HandleModuleErrors(InvalidInputError, ResourceNotFoundError)
  async deleteTodo(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('todoId', ParseIntPipe) todoId: number,
  ) {
    await this.todoService.delete({ id: todoId });

    this.projectGateway.broadcastTodoDeletion({ projectId, todoId });
  }

  @Put('/:todoId/tags/:tagId')
  async addTagToTodo(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('todoId', ParseIntPipe) todoId: number,
    @Param('tagId', ParseIntPipe) tagId: number,
  ) {
    const todo = await this.todoService.insertTag({
      projectId,
      tagId,
      todoId,
    });

    this.projectGateway.broadcastTodoUpdate(projectId, todo);

    return todo;
  }

  @Delete('/:todoId/tags/:tagId')
  async removeTagFromTodo(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('todoId', ParseIntPipe) todoId: number,
    @Param('tagId', ParseIntPipe) tagId: number,
  ) {
    const todo = await this.todoService.removeTag({
      projectId,
      tagId,
      todoId,
    });

    this.projectGateway.broadcastTodoUpdate(projectId, todo);

    return todo;
  }
}
