import { Injectable } from '@nestjs/common';

import { UserEntity } from '../entities';

import {
  NumberType,
  OptionalNestedType,
  OptionalRegexType,
  OptionalStringType,
  RegexType,
  StringType,
} from '@lib/decorators';
import { IsEmail, Length } from 'class-validator';
import { PageLimitPagination } from '@shared/validation';
import { ProjectEntity } from '@modules/projects/entities';

@Injectable()
export abstract class iUserService {
  abstract create(data: CreateUserInput): Promise<UserEntity>;
  abstract delete(data: DeleteUserInput): Promise<void>;
  abstract update(id: number, data: UpdateUserInput): Promise<UserEntity>;
  abstract getOne(data: GetOneUserInput): Promise<Partial<UserEntity>>;

  abstract enterProject(data: EnterOrExitProject): Promise<void>;
  abstract exitProject(data: EnterOrExitProject): Promise<void>;
  abstract getUserProjects(
    data: GetUserProjectsInput,
  ): Promise<Partial<ProjectEntity>[]>;
}

export class CreateUserInput {
  @StringType()
  @Length(3, 50)
  name: string;

  @StringType()
  @IsEmail()
  @Length(10, 128)
  email: string;

  // Min 8 characters, 1 letter, 1 number, 1 special character
  @RegexType(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  password: string;
}

export class DeleteUserInput {
  @NumberType()
  id: number;
}

export class UpdateUserInput {
  @OptionalStringType()
  @Length(3, 50)
  name?: string;

  @OptionalStringType()
  @IsEmail()
  @Length(10, 128)
  email?: string;

  // Min 8 characters, 1 letter, 1 number, 1 special character
  @OptionalRegexType(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  )
  password?: string;
}

export class GetOneUserInput {
  @NumberType()
  id: number;
}

export class EnterOrExitProject {
  @NumberType()
  userId: number;

  @NumberType()
  projectId: number;
}

export class GetUserProjectsInput {
  @NumberType()
  userId: number;

  @OptionalNestedType(PageLimitPagination)
  pagination?: PageLimitPagination;
}
