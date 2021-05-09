import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class QuestionDb {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public userId: number;
  @Column()
  public CategoryId: number;
  @Column()
  public title: string;
  @Column()
  public description: string;
}

export default QuestionDb;
