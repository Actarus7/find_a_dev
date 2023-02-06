import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "src/profiles/entities/profile.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('competences')
export class Competence extends BaseEntity{

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column()
    description: string

    @ApiProperty()
    @ManyToOne(() => Profile, (profile) => profile.competences)
    profile: Profile
}
