import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPostalCode, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsString()
  pseudo: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  region: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  departement: string;

  @ApiProperty()
  @IsString()
  address_1: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address_2: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address_3: string;

  @ApiProperty()
  @IsPostalCode('any')
  zipcode: string;
}
