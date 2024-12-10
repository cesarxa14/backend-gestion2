import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import ContenidoService from "./contenido.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Contenido } from "./contenido.entity";
import { CreateContenidoDto } from "./bloques/dtos/create-contenido.dto";
import { GetContentByIdDto } from "./dtos/get-content-by-id.dto";


@Controller('contents')
export default class ContenidoController {
    constructor(private readonly contenidoService: ContenidoService){}
  
    @Get()
    async getSeccion(): Promise<Contenido[]>{
        return await this.contenidoService.getContenidos();
    }

    @Get(':id')
    async getContentById(@Param() params: GetContentByIdDto,): Promise<Contenido>{
        return await this.contenidoService.getContentById(params);
    }


    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async createSeccion(@Body() createSeccionDto: CreateContenidoDto, @UploadedFile() image: Express.Multer.File): Promise<Contenido> {
        return await this.contenidoService.createContenido(createSeccionDto);
    }

    @Delete(':id')
    async deleteContent(@Param('id') id: number): Promise<Contenido>{
        try{
            return await this.contenidoService.deleteContent(id);
        }catch(err) {
            console.log('err: ', err)
            throw err;
        }
    }
}