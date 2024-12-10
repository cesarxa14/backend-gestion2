import { IsNotEmpty, IsString } from "class-validator";

export class updateSectionDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

  }