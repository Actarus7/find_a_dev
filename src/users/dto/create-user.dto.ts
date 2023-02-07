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
  address_1: string;

  @IsString()
  @IsOptional()
  address_2: string;

  @IsString()
  @IsOptional()
  address_3: string;

  @IsPostalCode('any')
  zipcode: string;
}
