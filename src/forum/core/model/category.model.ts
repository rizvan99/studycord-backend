import { Question } from './question.model';

export interface Category {
  id: number;
  name: string;
  questions: Question[];
}

export class CategoryClass implements Category {
  id: number;
  name: string;
  questions: Question[];
}
