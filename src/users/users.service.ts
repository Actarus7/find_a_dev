import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { catchError, lastValueFrom, map, Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}
  async create(createUserDto: CreateUserDto, hash: string) {
    const street = `${createUserDto.address_1} ${
      createUserDto.address_2 || ''
    } ${createUserDto.address_3 || ''}`
      .split(' ')
      .filter((item) => item != '')
      .join('+');
    const city = createUserDto.city.split(' ').join('+'); // 12 Av. Winston Churchill, 31100 Toulouse

    const codepostal = createUserDto.zipcode;
    const contry = createUserDto.country;

    const responseA = this.httpService
      .get(
        `https://geocode.maps.co/search?q=${street}+${city}+${codepostal}+${contry}`,
      )
      .pipe(
        map((responseB) => {
          return { lat: responseB.data[0].lat, lon: responseB.data[0].lon };
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      );

    const coord = await lastValueFrom(responseA);
    console.log(coord.lat);

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
    newUser.latitude = coord.lat;
    newUser.longitude = coord.lon;

    await newUser.save();

    return newUser;
  }

  async findOneByPseudo(pseudo: string) {
    const user = await User.findOne({ where: { pseudo: pseudo } });

    return user;
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
