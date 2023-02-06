import { Profile } from "src/profiles/entities/profile.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('competences')
export class Competence extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    competence: string

    @ManyToOne(() => Profile, (profile) => profile.competence)
    profile: Profile
}
