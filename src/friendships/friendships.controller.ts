import { Controller, Get, Post, Request, Patch, Param, Delete, ConflictException, ParseIntPipe , NotFoundException} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { Bind } from '@nestjs/common/decorators/core/bind.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { FriendshipsService } from './friendships.service';

@Controller('friendships')
export class FriendshipsController {
  constructor(
    private readonly friendshipsService: FriendshipsService,
    private readonly usersService: UsersService
    ) {}

  /**
   * Création ou mise à jour d'une Friendship
   * 
   * @param friendPseudo Nom du user que l'on souhaite lier
   * @param req La requete contenant le token
   * @returns le statut actuel du lien :
   * * 0 : N'existe pas
   * * 1 : En attente de votre part
   * * 2 : En attente de la part de l'autre user
   * * 3 : Le lien est partagé
   */
  @UseGuards(new JwtAuthGuard())
  @Post(':friendPseudo')
  async create(@Param('friendPseudo') friendPseudo: string, @Request() req) {
    
    const userPseudo = req.user.pseudo

    if (userPseudo === friendPseudo){
      throw new ConflictException("It is not possible to friendship yourself")
    }
    
    const friend = await this.usersService.findOneByPseudo(friendPseudo)

    if (friend === null)
    {
      throw new NotFoundException("This pseudo does not exist") 
    }

    let status = await this.friendshipsService.findStatusWithPseudo(userPseudo,friendPseudo)
    
    if (status.code === 0){
      const user = await this.usersService.findOneByPseudo(userPseudo);
      await this.friendshipsService.create(user,friend)
    }
    else if (status.code === 1)
    {
      await this.friendshipsService.promote(userPseudo,friendPseudo)
    }
    status = await this.friendshipsService.findStatusWithPseudo(userPseudo,friendPseudo)
    return {
      statusCode : 200,
      message : "Friendship status",
      data : {
        users : [userPseudo,friendPseudo],
        status : status.status,
      }

    }

  }

  @Get('/:friendPseudo')
  async findOne(@Param('friendPseudo') friendPseudo: string) {
    const userPseudo = "jo"
    return await this.friendshipsService.findOne(userPseudo,friendPseudo)
  }
/*
  @Get()
  async findall(@Param('friendPseudo') friendPseudo: string) {
    return await this.friendshipsService.findAll()
  }
  */
  /*

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.friendshipsService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendshipsService.remove(+id);
  }
  */
}
