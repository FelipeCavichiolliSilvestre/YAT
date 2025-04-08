import { Injectable } from '@nestjs/common';

import {
  iProjectRepository,
  iUserRepository,
} from '@infra/database/interfaces';
import {
  EntityNotFoundError,
  UniqueConstraintViolationError,
} from '@infra/database/errors';
import { HandleDatabaseErrors } from '@infra/database/errors/handlers';
import * as crypto from 'crypto';

import { UserEntity } from '../entities';
import {
  CreateUserInput,
  DeleteUserInput,
  EnterOrExitProject,
  GetOneUserInput,
  GetUserProjectsInput,
  iUserService,
  UpdateUserInput,
  VerifyUserInput,
} from '../interfaces/user.service.interface';

import { validatePlainObject } from '@lib/utils';
import * as bcrypt from 'bcrypt';
import { ProjectEntity } from '@modules/projects/entities';
import { MailService } from '@infra/mail/mail.service';

@Injectable()
export class BasicUserService implements iUserService {
  constructor(
    private userRepository: iUserRepository,
    private projectRepository: iProjectRepository,
    private mailService: MailService,
  ) {}

  @HandleDatabaseErrors(EntityNotFoundError)
  async verify(id: number, data: VerifyUserInput): Promise<void> {
    const { verificationCode } = validatePlainObject(VerifyUserInput, data);

    const user = await this.userRepository.findOneById(id);
    if (user.verificationCode === verificationCode) {
      await this.userRepository.updateOneById(id, {
        verified: true,
        verificationCode: null,
        verificationCodeDate: null,
      });
    }
  }

  @HandleDatabaseErrors(EntityNotFoundError)
  async resendVerificationCode(id: number) {
    const verificationCode = this.generateVerificationCode();

    const user = await this.userRepository.updateOneById(id, {
      verificationCode,
    });

    await this.mailService.sendVerificationEmail(user.email, verificationCode);
  }

  @HandleDatabaseErrors(EntityNotFoundError)
  async getUserProjects(
    data: GetUserProjectsInput,
  ): Promise<Partial<ProjectEntity>[]> {
    const { userId, pagination } = validatePlainObject(
      GetUserProjectsInput,
      data,
    );

    return this.userRepository.findProjectsOfUserById(userId, {
      pagination,
    });
  }

  @HandleDatabaseErrors(EntityNotFoundError)
  async enterProject(data: EnterOrExitProject): Promise<void> {
    const { userId, projectId } = validatePlainObject(EnterOrExitProject, data);

    this.userRepository.connectUserToProject({
      userId,
      projectId,
    });
  }

  @HandleDatabaseErrors(EntityNotFoundError)
  async exitProject(data: EnterOrExitProject): Promise<void> {
    const { userId, projectId } = validatePlainObject(EnterOrExitProject, data);

    const userIsOnlyMember =
      await this.projectRepository.isUserOnlyMemberInProject({
        projectId,
        userId,
      });

    // Delete projects with no members
    if (userIsOnlyMember) this.projectRepository.deleteOneById(projectId);
    else
      this.userRepository.disconnectUserToProject({
        userId,
        projectId,
      });
  }

  @HandleDatabaseErrors(UniqueConstraintViolationError)
  async create(data: CreateUserInput): Promise<UserEntity> {
    const { email, name, password } = validatePlainObject(
      CreateUserInput,
      data,
    );

    const verificationCode = this.generateVerificationCode();

    const user = await this.userRepository.createOne({
      email,
      name,
      verificationCode,
      passwordHash: await this.hashPassword(password),
    });

    this.mailService.sendVerificationEmail(email, verificationCode);

    return user;
  }

  @HandleDatabaseErrors(EntityNotFoundError)
  async delete(data: DeleteUserInput): Promise<void> {
    const { id } = validatePlainObject(DeleteUserInput, data);

    return this.userRepository.deleteOneById(id);
  }

  @HandleDatabaseErrors(EntityNotFoundError, UniqueConstraintViolationError)
  async update(id: number, data: UpdateUserInput): Promise<UserEntity> {
    const { name, email, password } = validatePlainObject(
      UpdateUserInput,
      data,
    );

    return this.userRepository.updateOneById(id, {
      name,
      email,
      passwordHash: password ? await this.hashPassword(password) : undefined,
    });
  }

  @HandleDatabaseErrors(EntityNotFoundError)
  async getOne(data: GetOneUserInput): Promise<Partial<UserEntity>> {
    const { id } = validatePlainObject(GetOneUserInput, data);

    return this.userRepository.findOneById(id);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  generateVerificationCode(): string {
    return crypto.randomBytes(96).toString('base64url');
  }
}
