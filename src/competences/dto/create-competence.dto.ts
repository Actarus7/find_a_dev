import { PartialType } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { IsNotEmpty } from "class-validator/types/decorator/decorators";
import { UpdateCompetenceDto } from "./update-competence.dto";

export class CreateCompetenceDto {
    
    @IsString()
    @IsNotEmpty()
    
    competence: string
}

