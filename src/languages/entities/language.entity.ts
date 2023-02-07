import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "src/profiles/entities/profile.entity";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("languages")
@Unique(['name'])
export class Language extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ type: 'varchar' })
    name: string;

    @ApiProperty()
    @ManyToMany(() => Profile, (profile) => profile.languages)
    profiles: Profile[];

}; 
