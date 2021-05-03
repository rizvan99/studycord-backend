
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './model/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserDb from './infrastructure/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserDb) private userRepository: Repository<User>,
  ) {}

  async getOne(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ username: username });
    if (user) {
      return user;
    }
    throw new HttpException(
      'Login credentials are incorrect',
      HttpStatus.BAD_REQUEST,
    );
  }
}
