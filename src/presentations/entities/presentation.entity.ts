import { ApiProperty } from '@nestjs/swagger';
import { profile } from 'console';
import { Profile } from 'src/profiles/entities/profile.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  JoinColumn,
} from 'typeorm';

@Entity('presentations')
export class Presentation extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({type: 'varchar'})
  description: string;

  @ApiProperty({ type: () => Profile })
  @OneToOne(() => Profile, profile => profile.presentation)
  profile: Profile;
}
