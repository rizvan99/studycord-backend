import { Injectable } from '@nestjs/common';
import { Category } from '../model/category.model';
import { InjectRepository } from '@nestjs/typeorm';
import CategoryDb from '../../infrastructure/data-source/entities/category.entity';
import { Repository } from 'typeorm';
import { ICategoryService } from '../interface/category.service.interface';

@Injectable()
export class CategoryService implements ICategoryService {
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
