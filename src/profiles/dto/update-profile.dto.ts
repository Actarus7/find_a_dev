import { PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { IsArray } from 'class-validator/types/decorator/decorators';
import { Competence } from 'src/competences/entities/competence.entity';
import { Language } from 'src/languages/entities/language.entity';
import { Presentation } from 'src/presentations/entities/presentation.entity';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {

    @IsNumber()
    presentation?: Presentation;

    @IsArray()
    languages?: Language[];

    @IsArray()
    competences?: Competence[];
    
};
