import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { iUserRepository } from '@infra/database/interfaces';
import { UserEntity } from '@modules/users/entities';

import {
  iAuthenticationService,
  LoginInput,
} from '../interfaces/authentication.interface';
import { UnauthenticatedUserError, UnauthorizedUserError } from '../error';

import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../types';
import { UnverifiedUserError } from '@shared/errors/unverified-user.error';

@Injectable()
export class AuthenticationService implements iAuthenticationService {
  constructor(
    private userRepository: iUserRepository,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginInput): Promise<UserEntity> {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user.verified) {
      throw new UnverifiedUserError({
        user: {
          id: user.id,
          email: user.email,
        },
      });
    }
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) throw new UnauthorizedUserError('Incorrect password');

    return user;
  }

  async createJwt(user: UserEntity): Promise<string> {
    const payload = {
      id: user.id,
    } as JwtPayload;

    return this.jwtService.signAsync(payload);
  }

  async verifyJwt(jwt: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verifyAsync(jwt);
    } catch (error) {
      throw new UnauthenticatedUserError(error.message);
    }
  }
}
