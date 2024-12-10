import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Bloque } from "./bloque.entity";
import { CreateBlockDto } from "./create-bloque.dto";
import BloqueService from "./bloque.service";
import { GetBloquesByContenidoDto } from "./dtos/get-bloques-by-contenido.dto";


@Controller('blocks')
export default class BloqueController {
    constructor(private readonly bloqueService: BloqueService){}
  
    @Get(':idContent')
    async getBlocksByContent(@Param() params: GetBloquesByContenidoDto): Promise<Bloque[]>{
        return await this.bloqueService.getBlocksByContent(params);
    }

    @Post()
    async createBlock(@Body() createSeccionDto: CreateBlockDto): Promise<Bloque> {
        // console.log('image_header: ', image_header)
        return await this.bloqueService.createBlock(createSeccionDto);
    }


}