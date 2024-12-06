import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import SeccionService from "./seccion.service";
import { Seccion } from "./seccion.entity";
import { CreateSeccionDto } from "./dtos/create-seccion.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { GetSectionByIdDto } from "./dtos/get-section-by-id.dto";
import { updateOrderSubsectionsDto } from "./subseccion/dtos/update-order-subsections.dto";


@Controller('secciones')
export default class SeccionController {
    constructor(private readonly seccionService: SeccionService){}

    @Get()
    async getSeccion(): Promise<Seccion[]>{
        return await this.seccionService.getSecciones();
    }

    @Get(':id')
    async getSeccionById(@Param() params: GetSectionByIdDto,): Promise<Seccion>{
        return await this.seccionService.getSeccionById(params);
    }

    @Post()
    @UseInterceptors(FileInterceptor('image_header'))
    async createSeccion(@Body() createSeccionDto: CreateSeccionDto, @UploadedFile() image_header: Express.Multer.File): Promise<Seccion> {
        // console.log('image_header: ', image_header)
        return await this.seccionService.createSeccion(createSeccionDto);
    }

    @Put(':id')
    async updateOrderSubsections(@Param('id') id: number, @Body() updateOrderSubsectionsDto: updateOrderSubsectionsDto): Promise<Seccion>{
        try{
            return await this.seccionService.updateOrderSubsections(id, updateOrderSubsectionsDto);
        }catch(err) {
            console.log('err: ', err)
            throw err;
        }
    }


}