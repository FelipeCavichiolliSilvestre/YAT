import { Injectable } from '@nestjs/common';
import { NumberType } from '@lib/decorators';

@Injectable()
export abstract class iAuthorizationService {
  abstract checkUserPermissionsForProject(
    data: CheckUserPermissionsForProjectInput,
  ): Promise<void>;
}

export class CheckUserPermissionsForProjectInput {
  @NumberType()
  projectId: number;

  @NumberType()
  userId: number;
}
