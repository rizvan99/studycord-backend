import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import QuestionDb from '../../infrastructure/data-source/entities/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from '../../api/dto/create.question.dto';
import { Category, CategoryClass } from '../model/category.model';
import { IQuestionService } from '../interface/question.service.interface';
import { User } from '../../../users/model/user.model';
import { UserDto } from '../../../auth/dto/user.dto';
import UserDb from '../../../users/infrastructure/user.entity';
import { UsersService } from '../../../users/users.service';
import { CategoryService } from './category.service';

@Injectable()
export class QuestionService implements IQuestionService {

  constructor(
    @InjectRepository(QuestionDb)
    private questionRepository: Repository<QuestionDb>,
    private userService: UsersService,
    private categoryService: CategoryService
  ) {}

  async getAllQuestions() {
    const test = await this.questionRepository.find({
      relations: ['category'],
    });
    return test;
  }

  async getQuestionById(id: number) {
    try {
      const question = await this.questionRepository.findOne(
        { id: id },
        { relations: ['replies'] },
      );
      if (question) {
        return question;
      }
    } catch (e) {
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }
  }

  async createQuestion(
    question: CreateQuestionDto,
    category: Category,
    user: UserDto,
  ) {
    const createdBy = await this.userService.getById(user.userId);
    const newQuestion = await this.questionRepository.create({
      ...question,
      category: category,
      createdBy: createdBy,
      creationDate: Date.now().toString(),
    });
    await this.questionRepository.save(newQuestion);
    console.log(newQuestion);
    return newQuestion;
  }

  async deleteQuestionById(id: number) {
    const deleteResponse = await this.questionRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }
  }


}
