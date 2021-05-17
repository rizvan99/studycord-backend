import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './model/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserDb from './infrastructure/user.entity';
import CreateUserDto from './dto/create.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserDb) private userRepository: Repository<User>,
  ) {
  }

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

  async createUser(userData: CreateUserDto) {
    const newUser = await this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async getById(userId: number) {
    const user = await this.userRepository.findOne({ userId });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
}
