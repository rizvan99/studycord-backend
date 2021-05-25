import { Question } from '../../forum/core/model/question.model';
import { Reply } from '../../forum/core/model/reply.model';

export interface User {
  userId: number;
  username: string;
  password: string;
  questions: Question[];
  replies?: Reply[];
}
