import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator/types/decorator/decorators";


export class CreatePresentationDto {
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    
    description: string
}
