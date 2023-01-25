import { iProjectRepository } from '@infra/database/interfaces';
import { validatePlainObject } from '@lib/utils';
import { Injectable } from '@nestjs/common';
import { UnauthorizedUserError } from '../error';
import {
  iAuthorizationService,
  CheckUserPermissionsForProjectInput,
} from '../interfaces/authorization.interface';

@Injectable()
export class AuthorizationService implements iAuthorizationService {
  constructor(private projectRepository: iProjectRepository) {}

  async checkUserPermissionsForProject(
    data: CheckUserPermissionsForProjectInput,
  ): Promise<void> {
    const { projectId, userId } = validatePlainObject(
      CheckUserPermissionsForProjectInput,
      data,
    );

    const userIsInProject =
      await this.projectRepository.doesUserBelongToProject({
        projectId,
        userId,
      });

    if (!userIsInProject)
      throw new UnauthorizedUserError("User isn't in project");
  }
}
