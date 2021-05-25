import { User } from '../../../users/model/user.model';
import { Question } from './question.model';

export interface Reply {
  id: number;
  content: string;
  creationDate?: string; // date
  createdBy?: User;
  question?: Question;
}
