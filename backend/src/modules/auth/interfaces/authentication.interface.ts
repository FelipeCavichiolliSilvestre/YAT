import { Injectable } from '@nestjs/common';

import { UserEntity } from '@modules/users/entities';
import { JwtPayload } from '../types';

@Injectable()
export abstract class iAuthenticationService {
  abstract login(data: LoginInput): Promise<UserEntity>;

  abstract createJwt(user: UserEntity): Promise<string>;

  abstract verifyJwt(jwt: string): Promise<JwtPayload>;
}

export interface LoginInput {
  email: string;
  password: string;
}
