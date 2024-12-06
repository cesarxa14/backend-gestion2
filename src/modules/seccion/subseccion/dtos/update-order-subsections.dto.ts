import { IsNotEmpty, IsString } from "class-validator";

export class updateOrderSubsectionsDto {
    @IsNotEmpty()
    @IsString()
    subsections_order: string;
  }