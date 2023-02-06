import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class CreatePresentationDto {
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    
    description: string
}
