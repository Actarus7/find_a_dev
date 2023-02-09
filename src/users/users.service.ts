import { Injectable } from '@nestjs/common';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Like } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService { 
  async create(createUserDto: CreateUserDto) {
    const newUser = new User();
    const profile = await new Profile().save()
    newUser.email = createUserDto.email;
    newUser.firstname = createUserDto.firstname; 
    newUser.lastname = createUserDto.lastname;
    newUser.pseudo = createUserDto.pseudo;
    newUser.password = createUserDto.password;
    newUser.city = createUserDto.city;
    newUser.country = createUserDto.country;
    newUser.region = createUserDto.region;
    newUser.departement = createUserDto.departement;
    newUser.address_1 = createUserDto.address_1;
    newUser.address_2 = createUserDto.address_2;
    newUser.address_3 = createUserDto.address_3;
    newUser.zipcode = createUserDto.zipcode;
    newUser.profile = profile

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

  async searchUser(getUserDto: GetUserDto) {
    console.log(getUserDto);

    const user = await Profile.find({
      relations: { user: true },
      select: { user: { pseudo: true } },
      where: [
        { competences: { description: Like(`%${getUserDto.competences}%`) } },
        { languages: { name: Like(`%${getUserDto.languages}%`) } },
        { user: { pseudo: Like(`%${getUserDto.pseudo}%`) } },
        { user: { country: Like(`%${getUserDto.country}%`) } },
        { user: { region: Like(`%${getUserDto.region}%`) } },
        { user: { departement: Like(`%${getUserDto.departement}%`) } },
        { user: { city: Like(`%${getUserDto.city}%`) } },
      ],
    });

    return user;
  }
  /*
  async searchUser2(getUserDto: GetUserDto) {
    console.log(getUserDto);
    // "pseudo", competences, langages, "pays", "region", "departement", "ville"
    const user = await User.find({
      select: { pseudo: true },
      relations: { profile: { competences: true, languages: true } },
      where: {
        pseudo: Like(`%${getUserDto.pseudo || ''}%`),
        country: Like(`%${getUserDto.country || ''}%`),
        region: Like(`%${getUserDto.region || ''}%`),
        departement: Like(`%${getUserDto.departement || ''}%`),
        city: Like(`%${getUserDto.city || ''}%`),
        profile: {
          competences: {
            description: Like(`%${getUserDto.competences || ''}%`),
          },
          languages: { name: Like(`%${getUserDto.languages || ''}%`) },
        },
      },
    });

    return user;
  }
  */
}
