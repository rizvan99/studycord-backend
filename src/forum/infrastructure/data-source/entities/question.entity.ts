import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import CategoryDb from './category.entity';
import { Category } from '../../../core/model/category.model';
import UserDb from '../../../../users/infrastructure/user.entity';
import ReplyDb from './reply.entity';

@Entity()
class QuestionDb {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column()
  public creationDate: string;

  @ManyToOne(() => CategoryDb, (category: CategoryDb) => category.questions)
  public category: Category;

  // eager = related entities always to be included - { eager: true, cascade: true, }
  @ManyToOne(() => UserDb, (createdBy: UserDb) => createdBy.questions, {
    eager: true,
    cascade: true,
  })
  public createdBy: UserDb;

  @OneToMany(() => ReplyDb, (reply: ReplyDb) => reply.question, {
    eager: true,
  })
  public replies?: ReplyDb[];
}
export default QuestionDb;
