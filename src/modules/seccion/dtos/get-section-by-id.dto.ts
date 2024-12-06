import { IsNumberString } from "class-validator";

export class GetSectionByIdDto {
    @IsNumberString()
    id: string;
  }