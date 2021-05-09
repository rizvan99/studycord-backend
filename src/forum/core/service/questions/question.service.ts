import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import QuestionDb from '../../../infrastructure/data-source/entities/question.entity';
import { Question } from '../../model/question.model';
import { IQuestionService } from '../../interface/iquestion.service.interface';

@Injectable()
export class QuestionService implements IQuestionService {
  constructor(
    @InjectRepository(QuestionDb)
    private categoryRepository: Repository<QuestionDb>,
  ) {}

  async getQuestionsFromCategory(categoryId: number): Promise<Question[]> {
    const questions = await this.categoryRepository.find();
    const QuestionDb: Question[] = JSON.parse(
      JSON.stringify(
        questions.filter((q) => {
          q.CategoryId === categoryId;
        }),
      ),
    );
    return QuestionDb;
  }
}
