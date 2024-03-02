import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import { LoginDto } from '../requests';
import { validatePassword } from 'src/users/user.validator';
import { User } from 'src/users/users.entity';
import { AbstractService } from 'libs/core/src';

@Injectable()
export class AuthService extends AbstractService<User> {
  constructor(
    private readonly _userService: UsersService,
    private readonly _jwtService: JwtService,
  ) {
    super();
  }

  async validateLogin(data: LoginDto) {
    const { identifier, password } = data;
    const user = await this._userService.getUserByIdentifier(identifier);

    if (!user) {
      throw new BadRequestException(
        "Sign in failed. Double-check if you've entered your email and password correctly and try again.",
      );
    }

    const isPasswordValid = await validatePassword(
      password,
      user && user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException(
        "Sign in failed. Double-check if you've entered your email and password correctly and try again.",
      );
    }

    delete user.password;

    return user;
  }

  async login(user: User) {
    const payload = { sub: user.id, username: user.identifier };
    const accessToken = await this._jwtService.signAsync(payload);

    return accessToken;
  }
}
