import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Friendship } from 'src/friendships/entities/friendship.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('users')
@Unique(['email', 'pseudo'])
export class User extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar' })
  email: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  firstname: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  lastname: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  pseudo: string;

  @ApiProperty()
  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  city: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  country: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  region: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  departement: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  address_1: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  address_2: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  address_3: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  zipcode: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Friendship, (friendship) => friendship.user)
  friendships: Friendship[];

  @OneToMany(() => Friendship, (friendship) => friendship.friend)
  friends: Friendship[];
}
