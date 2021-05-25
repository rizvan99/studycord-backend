import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import QuestionDb from './question.entity';
import UserDb from '../../../../users/infrastructure/user.entity';

@Entity()
class CategoryDb {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public name: string;
  @OneToMany(() => QuestionDb, (question: QuestionDb) => question.category, {
    eager: true,
    cascade: true,
  })
  public questions?: QuestionDb[];

}

export default CategoryDb;
