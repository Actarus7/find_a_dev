import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, Length } from 'class-validator';

export class GetUserDto2 {
  @ApiProperty()
  @IsString()
  @Length(1)
  @IsOptional()
  pseudo: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  competences: string[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  languages: string[];

  @ApiProperty()
  @IsString()
  @Length(1)
  @IsOptional()
  country: string;

  @ApiProperty()
  @IsString()
  @Length(1)
  @IsOptional()
  region: string;

  @ApiProperty()
  @IsString()
  @Length(1)
  @IsOptional()
  departement: string;

  @ApiProperty()
  @IsString()
  @Length(1)
  @IsOptional()
  city: string;
}
