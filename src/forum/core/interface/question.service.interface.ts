import { Category } from '../model/category.model';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateQuestionDto } from '../../api/dto/create.question.dto';
import { User } from '../../../users/model/user.model';

export const IQuestionServiceInterface = 'IQuestionServiceInterface';
export interface IQuestionService {
  getAllQuestions();
  getQuestionById(id: number);
  createQuestion(
    question: CreateQuestionDto,
    category: Category,
    createdBy: User,
  );
  deleteQuestionById(id: number);
}
