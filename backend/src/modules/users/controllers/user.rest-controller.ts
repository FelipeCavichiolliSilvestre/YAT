import { iAuthenticationService } from '@modules/auth/interfaces';
import { JwtPayload } from '@modules/auth/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Jwt, Pagination, User } from '@shared/decorators';
import {
  InvalidInputError,
  RepeatedFieldError,
  ResourceNotFoundError,
} from '@shared/errors';
import { HandleModuleErrors } from '@shared/errors/handlers';
import {
  JwtAuthHttpGuard,
  LoginAuthHttpGuard,
  PersonalRouteHttpGuard,
} from '@shared/guards';
import { UserEntity } from '../entities';

import { iUserService } from '../interfaces';

@Controller('/users')
export class UserRestController {
  constructor(
    private userService: iUserService,
    private authenticationService: iAuthenticationService,
  ) {}

  @Post('/')
  @HandleModuleErrors(InvalidInputError, RepeatedFieldError)
  async createUser(@Body() body: any) {
    return this.userService.create(body);
  }

  @Get('/me')
  @UseGuards(JwtAuthHttpGuard)
  @HandleModuleErrors(InvalidInputError, ResourceNotFoundError)
  async getLoggedUser(@Jwt() jwt: JwtPayload) {
    return this.userService.getOne({
      id: jwt.id,
    });
  }

  @Get('/:userId')
  @UseGuards(JwtAuthHttpGuard, PersonalRouteHttpGuard)
  @HandleModuleErrors(InvalidInputError, ResourceNotFoundError)
  async getUser(@Param('userId', ParseIntPipe) id: number) {
    return this.userService.getOne({
      id,
    });
  }

  @Get('/:userId/projects')
  @UseGuards(JwtAuthHttpGuard)
  @HandleModuleErrors(InvalidInputError, ResourceNotFoundError)
  async getUserProject(
    @Param('userId', ParseIntPipe) id: number,
    @Pagination() pagination: any,
  ) {
    return this.userService.getUserProjects({
      userId: id,
      pagination,
    });
  }

  @Patch('/:userId')
  @UseGuards(JwtAuthHttpGuard, PersonalRouteHttpGuard)
  @HandleModuleErrors(
    InvalidInputError,
    RepeatedFieldError,
    ResourceNotFoundError,
  )
  async updateUser(
    @Param('userId', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    return this.userService.update(id, body);
  }

  @Delete('/:userId')
  @UseGuards(JwtAuthHttpGuard, PersonalRouteHttpGuard)
  @HandleModuleErrors(ResourceNotFoundError)
  async deleteUser(@Param('userId', ParseIntPipe) id: number) {
    return this.userService.delete({ id });
  }

  @Post('/login')
  @UseGuards(LoginAuthHttpGuard)
  @HandleModuleErrors(ResourceNotFoundError)
  async loginUser(@User() user: UserEntity) {
    const jwt = await this.authenticationService.createJwt(user);

    return { jwt };
  }
}
