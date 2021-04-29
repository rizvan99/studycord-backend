import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class CategoryDb {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public name: string;
}

export default CategoryDb;
