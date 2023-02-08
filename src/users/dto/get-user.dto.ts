import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  pseudo: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  competence: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  languages: string;

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
