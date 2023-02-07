import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { IsNotEmpty } from "class-validator";

export class CreateCompetenceDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

};

