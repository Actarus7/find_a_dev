import { IsEmail, IsPostalCode, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  surname: string;

  @IsString()
  lastname: string;

  @IsString()
  pseudo: string;

  @IsString()
  password: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsString()
  region: string;

  @IsString()
  departement: string;

  @IsString()
  adress_1: string;

  @IsString()
  adress_2: string;

  @IsString()
  adress_3: string;

  @IsPostalCode('any')
  zipcode: string;
}
