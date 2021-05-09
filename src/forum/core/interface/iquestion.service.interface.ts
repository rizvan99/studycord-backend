import { Question } from '../model/question.model';

export const IquestionServiceProvider = 'IQuestionServiceProvider';
export interface IQuestionService {
  getQuestionsFromCategory(categoryId: number): Promise<Question[]>;
}
