import CreateUserDto from '../../../users/dto/create.user.dto';
import { Category } from '../../core/model/category.model';
import { User } from '../../../users/model/user.model';

export class CreateQuestionDto {
  title: string;
  description: string;
}

