import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto, hash: string) {
    const newUser = new User();
    newUser.email = createUserDto.email;
    newUser.firstname = createUserDto.firstname;
    newUser.lastname = createUserDto.lastname;
    newUser.pseudo = createUserDto.pseudo;
    newUser.password = hash;
    newUser.city = createUserDto.city;
    newUser.country = createUserDto.country;
    newUser.region = createUserDto.region;
    newUser.departement = createUserDto.departement;
    newUser.address_1 = createUserDto.address_1;
    newUser.address_2 = createUserDto.address_2;
    newUser.address_3 = createUserDto.address_3;
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

  async findOneByEmail(email: string) {
    const userMail = await User.findOne({ where: { email: email } });

    return userMail;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const newUser = await User.findOneBy({
      id: id,
    });
    newUser.pseudo = updateUserDto.pseudo;
    newUser.city = updateUserDto.city;
    newUser.country = updateUserDto.country;
    newUser.region = updateUserDto.region;
    newUser.departement = updateUserDto.departement;
    newUser.address_1 = updateUserDto.address_1;
    newUser.address_2 = updateUserDto.address_2;
    newUser.address_3 = updateUserDto.address_3;
    newUser.zipcode = updateUserDto.zipcode;

    await User.save(newUser);

    return await User.findOneBy({ id: id });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
