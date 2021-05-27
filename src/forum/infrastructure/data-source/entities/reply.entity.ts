import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import UserDb from '../../../../users/infrastructure/user.entity';
import QuestionDb from './question.entity';

@Entity()
class ReplyDb {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public content: string;
  @Column()
  public creationDate: string;

  @ManyToOne(() => UserDb, (createdBy: UserDb) => createdBy.replies, {
    eager: true,
    cascade: true,
  })
  public createdBy: UserDb;

  @ManyToOne(() => QuestionDb, (question: QuestionDb) => question.replies)
  public question: QuestionDb;
}

export default ReplyDb;
