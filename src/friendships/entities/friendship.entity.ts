import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


/**
 * Entity repressentant les liaison entre les users
 */
@Entity('friendships')
export class Friendship {
    @ApiProperty({description : "l'Id du friendship"})
    @PrimaryGeneratedColumn({type : "int"})
    id : number

    /** Le Friend a-t-il accepté la demande */
    @ApiProperty({description : "Le Friend a-t-il accepté la demande"})
    @Column({type : "boolean"})
    allowed: boolean

    /** Le user émetteur de la demande*/
    @ApiProperty({description : "Le user émetteur de la demande"})
    @ManyToOne(() => User, (user) => user.friendships)
    user : User

    /** Le user rescepteur de la demande*/
    @ApiProperty({description : "Le user rescepteur de la demande"})
    @ManyToOne(() => User, (user) => user.friends)
    friend : User
}
