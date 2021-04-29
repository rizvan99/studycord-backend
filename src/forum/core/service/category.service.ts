import { Injectable } from '@nestjs/common';
import { Category } from '../model/category.model';
import { InjectRepository } from '@nestjs/typeorm';
import CategoryDb from '../../infrastructure/data-source/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryDb)
    private categoryReposistory: Repository<CategoryDb>,
  ) {}
  async getCategories(): Promise<Category[]> {
    const categories = await this.categoryReposistory.find();
    const categoiresDb: Category[] = JSON.parse(JSON.stringify(categories));
    return categoiresDb;
  }
}
