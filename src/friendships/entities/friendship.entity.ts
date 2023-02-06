import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";


/**
 * Entity repressentant les liaison entre les users
 */
@Entity('friendships')
export class Friendship {

    /** Le Friend a-t-il accepté la demande */
    @Column()
    allowed: boolean

    /** Le user émetteur de la demande*/
    @ManyToOne(() => User, (user) => user.friendships)
    user : User

    /** Le user resepteur de la demande*/
    @ManyToOne(() => User, (user) => user.friends)
    friend : User
}
