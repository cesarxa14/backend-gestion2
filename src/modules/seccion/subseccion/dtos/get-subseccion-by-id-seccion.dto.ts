import { IsNumberString } from "class-validator";

export class GetSubseccionsByIdSeccionDto {
    @IsNumberString()
    idSeccion: string;
  }