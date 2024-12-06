import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import ContenidoService from "./contenido.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Contenido } from "./contenido.entity";
import { CreateContenidoDto } from "./bloques/dtos/create-contenido.dto";


@Controller('contents')
export default class ContenidoController {
    constructor(private readonly contenidoService: ContenidoService){}
  
    @Get()
    async getSeccion(): Promise<Contenido[]>{
        return await this.contenidoService.getContenidos();
    }


    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async createSeccion(@Body() createSeccionDto: CreateContenidoDto, @UploadedFile() image: Express.Multer.File): Promise<Contenido> {
        return await this.contenidoService.createContenido(createSeccionDto);
    }
}