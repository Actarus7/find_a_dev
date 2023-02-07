import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Friendship } from './entities/friendship.entity';


/**
 * Essemble des services pour la table friendships :
 * 
 * * **create**               : Permet la création de nouvelle relation entre 2 user
 * * **findOne**              : Permet de trouver la relation user => friend
 * * **findBoth**             : Permet de trouver les relations user => friend et friend => user
 * * **findStatusWithObject** : Permet d'obtenir le statut d'une relation en fonction des pseudos de 2 user
 * * **findStatusWithPseudo** : Permet d'obtenir le statut d'une relation en fonction des pseudos de 2 user
 * * **promote**              : Permet de valider l'état d'une relation
 * * **remove**               : 
 */
@Injectable()
export class FriendshipsService {

  /**
   * Permet la création de nouvelle relation entre 2 user
   * 
   * @param user      Objet du demandeur
   * @param friend    Objet de la cible
   * @returns         Les 2 nouvelles ligne crées :
   * * la première sur true
   * * la seconde sur false (en attente de validation de la cible)
   */ 
  async create(user : User, friend : User) {
    return [
      await Friendship.create({
        allowed : true ,
        user : user ,
        friend : friend
      }).save(),
      await Friendship.create({
        allowed : false ,
        user : friend ,
        friend : user
      }).save(),
    ]
  }
  /**
   * Permet de trouver la relation user => friend
   * 
   * @param userPseudo    Pseudo du sujet
   * @param friendPseudo  Pseudo de la cible
   * @returns             la relation user => friend
   */
  async findOne(userPseudo : string, friendPseudo  : string) : Promise<Friendship | undefined>
  {
    
    return (await Friendship.find(
      { 
        relations : {
          user : true , 
          friend : true
        },
        where : {
          user : {pseudo : userPseudo} , 
          friend : {pseudo : friendPseudo}
        },
        select : {
          allowed : true,
          user : { pseudo : true} ,
          friend : { pseudo : true} 
        },
      }))[0]  ;
  }

}
