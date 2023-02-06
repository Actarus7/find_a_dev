import { IsNumber, IsArray } from "class-validator";
import { Competence } from "src/competences/entities/competence.entity";
import { Language } from "src/languages/entities/language.entity";
import { Presentation } from "src/presentations/entities/presentation.entity";

export class CreateProfileDto {

    @IsNumber()
    presentation: Presentation;

    @IsArray()
    languages: Language[];

    @IsArray()
    competences: Competence[];
    
};
