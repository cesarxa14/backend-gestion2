import { IsNumberString } from "class-validator";

export class GetBloquesByContenidoDto {
    @IsNumberString()
    idContent: string;
  }