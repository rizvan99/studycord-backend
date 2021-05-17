import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class UserDb {
  @PrimaryGeneratedColumn()
  public userId?: number;

  @Column({ unique: true })
  public username: string;

  @Column()
  public password: string;
}
export default UserDb;
