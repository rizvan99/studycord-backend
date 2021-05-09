import { Module } from '@nestjs/common';
import { CategoryService } from './core/service/categories/category.service';
import { ICategoryServiceProvider } from './core/interface/icategory.service.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import CategoryDb from './infrastructure/data-source/entities/category.entity';
import { ForumGateway } from './api/gateway/forum.gateway';
import { QuestionService } from './core/service/questions/question.service';
import QuestionDb from './infrastructure/data-source/entities/question.entity';
import { IquestionServiceProvider } from './core/interface/iquestion.service.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryDb]),
    TypeOrmModule.forFeature([QuestionDb]),
  ],
  providers: [
    ForumGateway,
    {
      provide: ICategoryServiceProvider,
      useClass: CategoryService,
    },
    ForumGateway,
    {
      provide: IquestionServiceProvider,
      useClass: QuestionService,
    },
    QuestionService,
    CategoryService,
  ],
})
export class ForumModule {}
