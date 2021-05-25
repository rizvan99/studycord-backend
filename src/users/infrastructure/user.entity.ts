import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import QuestionDb from '../../forum/infrastructure/data-source/entities/question.entity';
import ReplyDb from '../../forum/infrastructure/data-source/entities/reply.entity';

@Entity()
class UserDb {
  @PrimaryGeneratedColumn()
  public userId?: number;

  @Column({ unique: true })
  public username: string;

  @Column()
  public password?: string;

  @OneToMany(() => QuestionDb, (question: QuestionDb) => question.createdBy)
  public questions?: QuestionDb[];

  @OneToMany(() => ReplyDb, (reply: ReplyDb) => reply.createdBy)
  public replies?: ReplyDb[];
}
export default UserDb;
