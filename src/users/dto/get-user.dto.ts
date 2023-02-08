import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  pseudo: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  competences: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  languages: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  profileId: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  country: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  region: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  departement: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  city: string;
}
