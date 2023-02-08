import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "src/profiles/entities/profile.entity";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

/**
 * Entity représentant les liaisons entre competences
 */
@Entity('competences')
@Unique(['description'])
export class Competence extends BaseEntity{

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({type: 'varchar'})
    description: string;

    /**liaison entre competence et profile */
    @ApiProperty()
    @ManyToMany(() => Profile, (profile) => profile.competences)
    profiles: Profile[];
    
};
