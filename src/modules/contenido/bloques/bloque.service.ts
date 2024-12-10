import { Injectable } from "@nestjs/common";
import { Bloque } from "./bloque.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { CreateBlockDto } from "./create-bloque.dto";
import { Contenido } from "../contenido.entity";
import { GetBloquesByContenidoDto } from "./dtos/get-bloques-by-contenido.dto";


@Injectable()
export default class BloqueService {

    constructor(
        @InjectRepository(Bloque) private readonly bloqueRepository: Repository<Bloque>,
        @InjectRepository(Contenido) private readonly contenidoRepository: Repository<Contenido>,
        private readonly dataSource: DataSource
    ){}

    async getBlocksByContent(getBlocksByContent: GetBloquesByContenidoDto): Promise<Bloque[]>{
        try {

            const idContent = getBlocksByContent.idContent;
            const sql = `
                SELECT b.*
                FROM bloques b
                INNER JOIN contenidos c ON c.id = b.contenido_id
                WHERE c.id = $1
                ORDER BY c.id
            `;

            const results = this.dataSource.query(sql, [idContent]);
            
            return results;

        } catch (err){
            console.log('err: ', err)
            throw err;
        }
    }

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