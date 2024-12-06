import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSeccionDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    image_header: string;
}
