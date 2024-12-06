import { IsNotEmpty, IsNumberString, IsString, MaxLength } from 'class-validator';

export class CreateSubseccionDto {

    @IsNotEmpty()
    @IsNumberString()
    seccion_id: string;

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
