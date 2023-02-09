import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsPostalCode, IsString, Length } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsString()
  @Length(1)
  pseudo: string;

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
  departement: string;

  @ApiProperty()
  @IsString()
  @Length(1)
  address_1: string;

  @ApiProperty()
  @IsString()
  @Length(1)
  address_2: string;

  @ApiProperty()
  @IsString()
  @Length(1)
  address_3: string;

  @ApiProperty()
  @IsPostalCode('any')
  zipcode: string;
}
