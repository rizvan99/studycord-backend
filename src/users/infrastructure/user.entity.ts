import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class UserDb {
  @PrimaryGeneratedColumn()
  public userId: number;

  @Column()
  public username: string;

  @Column()
  public password: string;
}
export default UserDb;
