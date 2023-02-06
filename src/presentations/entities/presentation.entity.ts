import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "src/profiles/entities/profile.entity";
import { BaseEntity, Column, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export class Presentation extends BaseEntity{

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column()
    description: string

    @ApiProperty()
    @OneToOne(() => Profile)
    profile: Profile
}
