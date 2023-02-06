import { Profile } from "src/profiles/entities/profile.entity";
import { BaseEntity, Column, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export class Presentation extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @OneToOne(() => Profile)
    profile: Profile
}
