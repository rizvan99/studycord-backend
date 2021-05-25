import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import CategoryDb from './forum/infrastructure/data-source/entities/category.entity';
import UserDb from './users/infrastructure/user.entity';
import QuestionDb from './forum/infrastructure/data-source/entities/question.entity';
import ReplyDb from './forum/infrastructure/data-source/entities/reply.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [
          CategoryDb, UserDb, QuestionDb, ReplyDb
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
