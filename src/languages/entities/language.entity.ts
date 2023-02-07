import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "src/profiles/entities/profile.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("languages")
@Unique(['name'])
export class Language extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({type: 'varchar'})
    name: string;

    @ApiProperty()
    @ManyToOne(() => Profile, (profile) => profile.languages)
    profile: Profile;

};
