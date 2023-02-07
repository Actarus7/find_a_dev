import { IsEmail, IsOptional, IsPostalCode, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  firstname: string;

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
  @IsOptional()
  departement: string;

  @IsString()
  adress_1: string;

  @IsString()
  @IsOptional()
  adress_2: string;

  @IsString()
  @IsOptional()
  adress_3: string;

  @IsPostalCode('any')
  zipcode: string;
}
