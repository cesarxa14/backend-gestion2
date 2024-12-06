import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import SubseccionService from "./subseccion.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Subseccion } from "./subseccion.entity";
import { CreateSubseccionDto } from "./dtos/create-subseccion.dto";
import { GetSubseccionsByIdSeccionDto } from "./dtos/get-subseccion-by-id-seccion.dto";


@Controller('subsecciones')
export default class SubSeccionController {
    constructor(private readonly subseccionService: SubseccionService){}

    @Get('seccion/:idSeccion')
    async getSubseccionesByIdSeccion(@Param() params: GetSubseccionsByIdSeccionDto,): Promise<Subseccion[]>{
        console.log('params', params)
        return await this.subseccionService.getSubseccionesByIdSeccion(params);
    }

    @Post()
    @UseInterceptors(FileInterceptor('image_header'))
    async createSeccion(@Body() createSubseccionDto: CreateSubseccionDto, @UploadedFile() image_header: Express.Multer.File): Promise<Subseccion> {
        console.log('seccion: ', createSubseccionDto.seccion_id)
        return await this.subseccionService.createSubSeccion(createSubseccionDto);
    }

    

}