import { Injectable } from '@nestjs/common';

import { UserEntity } from '@modules/users/entities';

import {
  FindManyInputBase,
  iCrudRepository,
} from './crud.repository.interface';
import { FindManyProjectsInput } from './project.repository.interface';
import { ProjectEntity } from '@modules/projects/entities';

@Injectable()
export abstract class iUserRepository extends iCrudRepository<
  UserEntity,
  CreateOneUserInput,
  UpdateOneUserInput,
  FindManyUsersInput
> {
  abstract findOneByEmail(email: string): Promise<UserEntity>;
  abstract connectUserToProject(
    data: ConnectOrDisconnectUserToProject,
  ): Promise<void>;
  abstract disconnectUserToProject(
    data: ConnectOrDisconnectUserToProject,
  ): Promise<void>;
  abstract findProjectsOfUserById(
    id: number,
    data: FindManyProjectsInput,
  ): Promise<Partial<ProjectEntity>[]>;
}

export interface CreateOneUserInput {
  name: string;
  email: string;
  passwordHash: string;
  verified?: boolean;
  verificationCode?: string | null;
  verificationCodeDate?: string | null;
}

export type UpdateOneUserInput = Partial<CreateOneUserInput>;

export type FindManyUsersInput = FindManyInputBase<UserEntity>;

export interface ConnectOrDisconnectUserToProject {
  userId: number;
  projectId: number;
}
