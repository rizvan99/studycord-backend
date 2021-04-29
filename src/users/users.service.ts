
import { Injectable } from '@nestjs/common';
import { User } from './model/user.model';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'john',
      password: 'doe',
    },
    {
      id: 2,
      username: 'bob',
      password: 'joe',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
