import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/model/user.model';
import { JwtService } from '@nestjs/jwt';
import { from, Observable } from 'rxjs';

import * as bcrypt from 'bcrypt';
import RegisterDto from './dto/register.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, hashedPass: string): Promise<User> {
    try {
      const user = await this.usersService.getOne(username);
      await this.verifyPassword(hashedPass, user.password);
      user.password = undefined;
      return user;
    } catch (e) {
      throw new HttpException(
        'Wrong username or password',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      username: payload.username,
      token: this.jwtService.sign(payload),
      userId: user.userId,
    };
  }

  public async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.usersService.createUser({
        ...registrationData,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      // 23505 is Postgres unique violation code
      if (error?.code === '23505') {
        throw new HttpException(
          'User with that name already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
