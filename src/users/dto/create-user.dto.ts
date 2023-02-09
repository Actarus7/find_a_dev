import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsPostalCode,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(1)
  firstname: string;

  @ApiProperty()
  @IsString()
  @Length(1)
  lastname: string;

  @ApiProperty()
  @IsString()
  @Length(1)
  pseudo: string;

  @ApiProperty()
  @IsString()
  @Length(1)
  password: string;

  @ApiProperty()
  @IsString()
  @Length(1)
  city: string;

  @ApiProperty()
  @IsString()
  @Length(1)
  country: string;

  @ApiProperty()
  @IsString()
  @Length(1)
  region: string;

  @ApiProperty()
  @IsString()
  @Length(1)
  @IsOptional()
  departement: string;

  @ApiProperty()
  @IsString()
  @Length(1)
  address_1: string;

  @ApiProperty()
  @IsString()
  @Length(1)
  @IsOptional()
  address_2: string;

  @ApiProperty()
  @IsString()
  @Length(1)
  @IsOptional()
  address_3: string;

  @ApiProperty()
  @IsPostalCode('any')
  zipcode: string;
}
