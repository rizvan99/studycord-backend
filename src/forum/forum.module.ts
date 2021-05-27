import { Module } from '@nestjs/common';
import { CategoryService } from './core/service/category.service';
import { ICategoryServiceProvider } from './core/interface/category.service.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import CategoryDb from './infrastructure/data-source/entities/category.entity';
import { ForumGateway } from './api/gateway/forum.gateway';
import { ForumController } from './api/controller/forum.controller';
import { QuestionService } from './core/service/question.service';
import QuestionDb from './infrastructure/data-source/entities/question.entity';
import { QuestionGateway } from './api/gateway/question.gateway';
import { IQuestionServiceInterface } from './core/interface/question.service.interface';
import { UsersService } from '../users/users.service';
import { ReplyService } from './core/service/reply.service';
import UserDb from '../users/infrastructure/user.entity';
import { IReplyServiceProvider } from './core/interface/reply.service.interface';
import ReplyDb from './infrastructure/data-source/entities/reply.entity';
import { QuestionController } from './api/controller/question.controller';
import { ReplyGateway } from './api/gateway/reply.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryDb, QuestionDb, UserDb, ReplyDb]),
  ],
  providers: [
    CategoryService,
    UsersService,
    ForumGateway,
    QuestionGateway,
    ReplyGateway,
    QuestionService,
    {
      provide: ICategoryServiceProvider,
      useClass: CategoryService,
    },
    {
      provide: IQuestionServiceInterface,
      useClass: QuestionService,
    },
    {
      provide: IReplyServiceProvider,
      useClass: ReplyService,
    },
  ],
  controllers: [ForumController, QuestionController],
  exports: [CategoryService, UsersService, QuestionService],
})
export class ForumModule {}
