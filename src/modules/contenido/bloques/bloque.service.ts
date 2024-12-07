import { Injectable } from "@nestjs/common";
import { Bloque } from "./bloque.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateBlockDto } from "./create-bloque.dto";
import { Contenido } from "../contenido.entity";


@Injectable()
export default class BloqueService {

    constructor(
        @InjectRepository(Bloque) private readonly bloqueRepository: Repository<Bloque>,
        @InjectRepository(Contenido) private readonly contenidoRepository: Repository<Contenido>,
    ){}

    async createBlock(createBloqueDto: CreateBlockDto): Promise<Bloque>{
        try {
            console.log('createBloqueDto: ', createBloqueDto)

            // Busca la sección relacionada
            const contenidoData = await this.contenidoRepository.findOneOrFail({
                where: { id: Number(createBloqueDto.contenido_id) },
            });

            
            let newBlock = new Bloque()
            newBlock.content = createBloqueDto.content;
            newBlock.contenido = contenidoData;

          
            const nuevaSeccion = this.bloqueRepository.create(newBlock);
            
            return await this.bloqueRepository.save(nuevaSeccion);
        } catch(err) {
            console.log('err', err)
            throw err;
        }
    }



}