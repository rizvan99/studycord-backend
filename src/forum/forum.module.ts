import { Module } from '@nestjs/common';
import { CategoryService } from './core/service/category.service';
import { ICategoryServiceProvider } from './core/interface/category.service.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import CategoryDb from './infrastructure/data-source/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryDb])],
  providers: [
    CategoryService,
    {
      provide: ICategoryServiceProvider,
      useClass: CategoryService,
    },
  ],
})
export class ForumModule {}
