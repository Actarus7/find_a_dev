import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Patch,
  Request,
  ConflictException,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUserDto } from './dto/get-user.dto';

/**décorateur Tag permettant de catégoriser les différentes route dans la doc API Swagger*/
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Création d'un user.
   * @param createUserDto Dto contenant le body de la requête.
   * @returns Les datas du nouvel utilisateur.
   */
  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createUserDto: CreateUserDto) {
    const saltOrRounds = 10;

    const isPseudoExist = await this.usersService.findOneByPseudo(
      createUserDto.pseudo,
    );
    if (isPseudoExist)
      throw new ConflictException(
        'Pseudo déjà utilisé, veuillez changer de pseudo',
      );

    const isEmailExist = await this.usersService.findOneByEmail(
      createUserDto.email,
    );
    if (isEmailExist)
      throw new ConflictException(
        'E-mail déjà utilisé, veuillez entrer un e-mail valide',
      );

    // Hashage du password
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    // Création du user
    const user = await this.usersService.create(createUserDto, hash);

    return {
      statusCode: 201,
      message: 'Utilisateur enregistré',
      data: {
        user,
      },
    };
  }
  /**
   * Permet la modification du pseudo et/ou de l'adresse du user connecté
   * @param updateUserDto Dto contenant le body de la requête.
   * @param req Requête contenant le token.
   * @returns les données de l'utilisateur concerné, après application des modifications.
   */
  @UseGuards(JwtAuthGuard)
  @Patch()
  @UseInterceptors(ClassSerializerInterceptor)
  async update(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    const userLogged = req.user.id;
    //requête la modification de l'adresse/pseudo
    const userUpdate = await this.usersService.update(
      userLogged,
      updateUserDto,
    );

    return {
      statusCode: 201,
      message: 'Modifications enregistrées',
      data: {
        userUpdate,
      }, 
    };
  }

  @Get()
  //@UseInterceptors(ClassSerializerInterceptor)
  async search(@Body() getUserDto: GetUserDto) {
    const user = await this.usersService.searchUser(getUserDto);

    return user;
  }
}
