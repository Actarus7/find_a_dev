import { ApiProperty } from "@nestjs/swagger";
import { Competence } from "src/competences/entities/competence.entity";
import { Language } from "src/languages/entities/language.entity";
import { Presentation } from "src/presentations/entities/presentation.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('profiles')
export class Profile extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @OneToOne(() => Presentation)
  @JoinColumn()
  presentation: Presentation;

  @ApiProperty()
  @ManyToMany(() => Language, language => language.profiles)
  @JoinTable()
  languages: Language[];

  @ApiProperty()
  @OneToMany(() => Competence, competence => competence.profile)
  competences: Competence[];

  @ApiProperty({type : () => User})
  @JoinColumn()
  @OneToOne(() => User)
  user: User;

};
