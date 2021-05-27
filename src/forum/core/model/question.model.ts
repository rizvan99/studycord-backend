import { Category } from './category.model';
import { User } from '../../../users/model/user.model';
import { Reply } from './reply.model';

export interface Question {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  createdBy: User;
  category: Category;
  replies?: Reply[];
}

