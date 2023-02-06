import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { IsNotEmpty } from "class-validator/types/decorator/decorators";

export class CreateCompetenceDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    
    description: string
}

