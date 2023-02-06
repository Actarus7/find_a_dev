import { IsString } from "class-validator";
import { IsNotEmpty } from "class-validator/types/decorator/decorators";

export class CreateLanguageDto {

    @IsString()
    @IsNotEmpty()
    name: string;
    
};
