import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { QuestionService } from '../../core/service/question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get(':id')
  async getQuestionById(@Param('id') id: number) {
    const result = await this.questionService.getQuestionById(id);
    if (result === undefined) {
      throw new NotFoundException('Invalid question');
    }
    return result;
  }
}
