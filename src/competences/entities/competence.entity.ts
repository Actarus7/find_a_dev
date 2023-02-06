import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('competences')
export class Competence extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    competence: string
}
