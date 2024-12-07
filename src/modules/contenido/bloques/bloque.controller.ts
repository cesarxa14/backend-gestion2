import { Body, Controller, Get, Post } from "@nestjs/common";
import { Bloque } from "./bloque.entity";
import { CreateBlockDto } from "./create-bloque.dto";
import BloqueService from "./bloque.service";


@Controller('blocks')
export default class BloqueController {
    constructor(private readonly bloqueService: BloqueService){}
  
    // @Get()
    // async getSeccion(): Promise<Bloque[]>{
    //     return await this.contenidoService.getContenidos();
    // }

    @Post()
    async createSeccion(@Body() createSeccionDto: CreateBlockDto): Promise<Bloque> {
        // console.log('image_header: ', image_header)
        return await this.bloqueService.createBlock(createSeccionDto);
    }

}