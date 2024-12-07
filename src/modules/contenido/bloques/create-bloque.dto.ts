import { IsNotEmpty, IsNumber, IsNumberString, IsString, MaxLength } from 'class-validator';

export class CreateBlockDto {

    @IsNotEmpty()
    @IsNumber()
    contenido_id: number;

    @IsNotEmpty()
    @IsString()
    content: string;

}
