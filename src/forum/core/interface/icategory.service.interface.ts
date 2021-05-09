import { Category } from '../model/category.model';

export const ICategoryServiceProvider = 'ICategoryServiceProvider';
export interface ICategoryService {
  getCategories(): Promise<Category[]>;
}
