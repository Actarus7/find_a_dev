import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "src/profiles/entities/profile.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("languages")
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
