import { Module } from '@nestjs/common';
import { CategoryService } from './core/service/category.service';

@Module({
  providers: [CategoryService]
})
export class ForumModule {}
