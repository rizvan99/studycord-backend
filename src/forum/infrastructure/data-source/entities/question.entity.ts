import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Question {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public userId: number;
  @Column()
  public genreId: number;
  @Column()
  public title: string;
  @Column()
  public description: string;
}
