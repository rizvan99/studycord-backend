import { Category } from '../model/category.model';
import { Reply } from '../model/reply.model';
import { CreateQuestionDto } from '../../api/dto/create.question.dto';
import { User } from '../../../users/model/user.model';
import { CreateReplyDto } from '../../api/dto/create.reply.dto';
import { Question } from '../model/question.model';

export const IReplyServiceProvider = 'IProvideServiceProvider';
export interface IReplyService {
  getReplies();
  getReplyById(id: number);
  createReply(
    reply: CreateReplyDto,
    createdBy: User,
    question: Question,
  );
  deleteReply(id: number);
}
