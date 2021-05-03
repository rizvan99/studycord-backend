import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserDb from './infrastructure/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserDb])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
