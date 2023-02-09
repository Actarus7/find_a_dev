import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePresentationDto {
  @ApiProperty()
  @IsString()
  @Length(1)
  @IsNotEmpty()
  description: string;
}
