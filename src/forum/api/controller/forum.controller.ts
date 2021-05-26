import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { CategoryService } from '../../core/service/category.service';
import { Category } from '../../core/model/category.model';

@Controller('forum')
export class ForumController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':name')
  async getCategoryByName(@Param('name') name: string) {
    const result = await this.categoryService.getCategoryByName(name);
    if (result === undefined) {
      throw new NotFoundException('Invalid category');
    }
    return result;
  }
}
