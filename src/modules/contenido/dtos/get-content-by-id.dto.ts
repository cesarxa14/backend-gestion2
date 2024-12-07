import { IsNumberString } from "class-validator";

export class GetContentByIdDto {
    @IsNumberString()
    id: string;
  }