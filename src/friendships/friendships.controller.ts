import {
  Controller,
  Get,
  Post,
  Request,
  Param,
  Delete,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { FriendshipsService } from './friendships.service';

/**
 * Essemble des controlers pour la table friendships :
 * 
 * * **create**   : Création ou mise à jour d'une Friendship
 * * **findOne**  : Récupération du status d'une Friendship
 * * **findall**  : Ensemble des relation d'un user
 * * **remove**   : Permet la suppression des liaisons entre 2 users
 */
//décorateur Tag permettant de catégoriser les différentes route dans la doc API Swagger
@ApiTags('Friendships')
@Controller('friendships')
export class FriendshipsController {
  constructor(
    private readonly friendshipsService: FriendshipsService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Création ou mise à jour d'une Friendship
   *
   * @param friendPseudo  Nom du user que l'on souhaite lier
   * @param req           La requete contenant le token
   * @returns le statut actuel du lien :
   * * 0 : N'existe pas
   * * 1 : En attente de votre part
   * * 2 : En attente de la part de l'autre user
   * * 3 : Le lien est partagé
   */
  @UseGuards(new JwtAuthGuard())
  @Post(':friendPseudo')
  async create(@Param('friendPseudo') friendPseudo: string, @Request() req) {
    const userPseudo = req.user.pseudo;

    if (userPseudo === friendPseudo) {
      throw new ConflictException('It is not possible to friendship yourself');
    }

    const friend = await this.usersService.findOneByPseudo(friendPseudo);

    if (friend === null) {
      throw new NotFoundException('This pseudo does not exist');
    }

    let status = await this.friendshipsService.findStatusWithPseudo( userPseudo, friendPseudo );

    if (status.code === 0) {
      const user = await this.usersService.findOneByPseudo(userPseudo);
      await this.friendshipsService.create(user, friend);
    } else if (status.code === 1) {
      await this.friendshipsService.promote(userPseudo, friendPseudo);
    }
    status = await this.friendshipsService.findStatusWithPseudo(
      userPseudo,
      friendPseudo,
    );
    return {
      statusCode: 200,
      message: 'Friendship status',
      data: {
        users: [userPseudo, friendPseudo],
        status: status.status,
      },
    };
  }

  /**
   * Récupération du status d'une Friendship
   *
   * @param friendPseudo  Nom du user que l'on souhaite lier
   * @param req           La requete contenant le token
   * @returns le statut actuel du lien :
   * * 0 : N'existe pas
   * * 1 : En attente de votre part
   * * 2 : En attente de la part de l'autre user
   * * 3 : Le lien est partagé
   */
  @UseGuards(new JwtAuthGuard())
  @Get(':friendPseudo')
  async findOne(@Param('friendPseudo') friendPseudo: string, @Request() req) {
    const userPseudo = req.user.pseudo;
    const friend = await this.usersService.findOneByPseudo(friendPseudo);

    if (friend === null) {
      throw new NotFoundException('This pseudo does not exist');
    }
    
    const status = await this.friendshipsService.findStatusWithPseudo(
      userPseudo,
      friendPseudo,
    );
    return {
      statusCode: 200,
      message: 'Friendship status',
      data: {
        users: [userPseudo, friendPseudo],
        status: status.status,
      },
    };
  }

}
