import { Category } from '../model/category.model';
import { Reply } from '../model/reply.model';
import { CreateQuestionDto } from '../../api/dto/create.question.dto';
import { User } from '../../../users/model/user.model';
import { CreateReplyDto } from '../../api/dto/create.reply.dto';

export const IReplyServiceProvider = 'IProvideServiceProvider';
export interface IReplyService {
  getReplies(): Promise<Reply[]>;
  getReplyById(id: number);
  createReply(
    reply: CreateReplyDto,
    createdAt: string, // date
    createdBy: User,
  );
  deleteReply(id: number);
}
