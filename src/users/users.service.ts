import { Injectable } from '@nestjs/common';
import { ILike, In } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
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

  async findAll() {
    const users = await User.find({ relations: { profile: true } });
    return users;
  }

  async findOneByPseudo(pseudo: string) {
    const user = await User.findOne({ where: { pseudo: pseudo } });

    return user;
  }

  async findOneByEmail(email: string) {
    const userMail = await User.findOne({ where: { email: email } });

    return userMail;
  }

  async findOneById(id: number) {
    const user = await User.findOneBy({ id });

    if (user) {
      return user;
    }

    return undefined;
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

  async searchUser(getUserDto: GetUserDto) {
    // "pseudo", competences, langages, "pays", "region", "departement", "ville"
    const users = await User.find({
      select: {
        pseudo: true,
        country: true,
        region: true,
        departement: true,
        city: true,
      },
      relations: { profile: { competences: true, languages: true } },
      where: {
        pseudo: ILike(`%${getUserDto.pseudo || ''}%`),
        country: ILike(`%${getUserDto.country || ''}%`),
        region: ILike(`%${getUserDto.region || ''}%`),
        departement: ILike(`%${getUserDto.departement || ''}%`),
        city: ILike(`%${getUserDto.city || ''}%`),

        profile: {
          competences: {
            description: getUserDto.competences
              ? In(getUserDto.competences)
              : undefined,
          },
          languages: {
            name: getUserDto.languages ? In(getUserDto.languages) : undefined,
          },
        },
      },
    });

    return users.filter((item) => {
      let result = true;
      if (getUserDto.languages) {
        const languages = item.profile.languages.map((elem) => elem.name);
        getUserDto.languages.forEach((elem) => {
          result = result && languages.includes(elem);
        });
      }
      if (getUserDto.competences) {
        const competences = item.profile.competences.map(
          (elem) => elem.description,
        );
        getUserDto.languages.forEach((elem) => {
          result = result && competences.includes(elem);
        });
      }
      return result;
    });
  }
}
