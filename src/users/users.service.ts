import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto, hash: string) {
    const newUser = new User();
    newUser.email = createUserDto.email;
    newUser.surname = createUserDto.surname;
    newUser.lastname = createUserDto.lastname;
    newUser.pseudo = createUserDto.pseudo;
    newUser.password = hash;
    newUser.city = createUserDto.city;
    newUser.country = createUserDto.country;
    newUser.region = createUserDto.region;
    newUser.departement = createUserDto.departement;
    newUser.adress_1 = createUserDto.adress_1;
    newUser.adress_2 = createUserDto.adress_2;
    newUser.adress_3 = createUserDto.adress_3;
    newUser.zipcode = createUserDto.zipcode;

    await newUser.save();

    return newUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneByPseudo(pseudo: string) {
    const user = await User.findOne({ where: { pseudo: pseudo } });

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
