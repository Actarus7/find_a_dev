import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsPostalCode, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsString()
  pseudo: string;

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
  departement: string;

  @ApiProperty()
  @IsString()
  address_1: string;

  @ApiProperty()
  @IsString()
  address_2: string;

  @ApiProperty()
  @IsString()
  address_3: string;

  @ApiProperty()
  @IsPostalCode('any')
  zipcode: string;
}
