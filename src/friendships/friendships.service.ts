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

  /**
   * Permet de trouver les relations user => friend et friend => user
   * 
   * @param userPseudo    Pseudo du sujet
   * @param friendPseudo  Pseudo de la cible
   * @returns             [ {user => friend} , {friend => user} ]
   */
  async findBoth(userPseudo : string, friendPseudo  : string)  : Promise < Friendship[] | undefined >
  {
    const firth = await this.findOne( userPseudo, friendPseudo )
    
    if ( firth !== undefined )
    {
      return [
        firth ,
        await this.findOne( friendPseudo, userPseudo ),
      ];
    }
    return undefined
  }

  /**
   * Permet d'obtenir le statut d'une relation en fonction des pseudos de 2 user
   * 
   * @param friendships 
   * @returns le statut actuel du lien :
   * * 0 : N'existe pas
   * * 1 : En attente de votre part
   * * 2 : En attente de la part de l'autre user
   * * 3 : Le lien est partagé
   */
  async findStatusWithObject(friendships?  : Friendship[])  : Promise<{status : string,code:number}>
  {
    if (friendships === undefined)
    {
      return {
        status : "not exist",
        code : 0
      }
    }
    const [allowed1,allowed2] = friendships.map(item => item.allowed)
    if (!allowed1){
      return {
        status : "waiting for you",
        code : 1
      }
    }
    if (!allowed2){
      return {
        status : "waiting for the other",
        code : 2
      }
    }
    
    return {
      status : "allowed",
      code : 3
    }
  }

  /**
   * Permet d'obtenir le statut d'une relation en fonction des pseudos de 2 user
   * 
   * @param userPseudo    Pseudo du sujet
   * @param friendPseudo  Pseudo de la cible
   * @returns le statut actuel du lien :
   * * 0 : N'existe pas
   * * 1 : En attente de votre part
   * * 2 : En attente de la part de l'autre user
   * * 3 : Le lien est partagé
   */
  async findStatusWithPseudo(userPseudo : string, friendPseudo  : string)  : Promise<{status : string,code:number}>
  {
    const friendships = await this.findBoth(userPseudo, friendPseudo)
    return this.findStatusWithObject(friendships)
  }


}
