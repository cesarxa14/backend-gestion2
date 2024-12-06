import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateContenidoDto {


    @IsNotEmpty()
    @IsString()
    seccion_id: string;


    @IsNotEmpty()
    @IsString()
    title: string;
    
    @IsNotEmpty()
    @IsString()
    keywords: string;

    @IsNotEmpty()
    @IsString()
    description: string;


    @IsNotEmpty()
    @IsString()
    introduction: string;


    @IsNotEmpty()
    @IsString()
    image: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsOptional()
    @IsString()
    article: string;

    @IsOptional()
    @IsString()
    link: string;


    @IsOptional()
    @IsString()
    document: string;

}