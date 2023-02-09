import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class GetUserDto {
  @ApiProperty()
  @IsString()
  @Length(1)
  @IsOptional()
  pseudo: string;

  @ApiProperty()
  @IsString()
  @Length(1)
  @IsOptional()
  competences: string;

  @ApiProperty()
  @IsString()
  @Length(1)
  @IsOptional()
  languages: string;

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
