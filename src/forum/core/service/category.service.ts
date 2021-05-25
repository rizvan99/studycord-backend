import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Category, CategoryClass } from '../model/category.model';
import { InjectRepository } from '@nestjs/typeorm';
import CategoryDb from '../../infrastructure/data-source/entities/category.entity';
import { Repository } from 'typeorm';
import { ICategoryService } from '../interface/category.service.interface';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @InjectRepository(CategoryDb)
    private categoryRepository: Repository<CategoryDb>,
  ) {}
  async getCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();
    const categoriesDb: Category[] = JSON.parse(JSON.stringify(categories));
    return categoriesDb;
  }

  async getCategoryByName(name: string) {
    try {
      const category = await this.categoryRepository.findOne(
        { name: name },
        { relations: ['questions'] },
      );

      if (category) {
        // workaround to avoid circular relations
        category.questions.forEach((q) => {
          q.category = new CategoryClass();
          q.category.id = category.id;
        });
        return category;
      }
    } catch (e) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
  }
}
