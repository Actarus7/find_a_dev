import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "src/profiles/entities/profile.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

/**
 * Entity représentant les liaisons entre competences
 */
@Entity('competences')
export class Competence extends BaseEntity{

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({type: 'varchar'})
    description: string;

    /**liaison entre competence et profile */
    @ApiProperty()
    @ManyToOne(() => Profile, (profile) => profile.competences)
    profile: Profile;
    
};
