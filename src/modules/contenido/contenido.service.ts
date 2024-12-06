import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { S3Service } from "src/shared/services/s3.service";
import { Contenido } from "./contenido.entity";
import { Repository } from "typeorm";
import { CreateContenidoDto } from "./bloques/dtos/create-contenido.dto";
import { Seccion } from "../seccion/seccion.entity";


@Injectable()
export default class ContenidoService {

    s3Service: S3Service = new S3Service(
        { 
            region: process.env.REGION_S3, 
            credentials: {
                accessKeyId: process.env.ACCESS_KEY_S3,
                secretAccessKey: process.env.SECRET_KEY_S3
            }
        });
    constructor(
        @InjectRepository(Contenido) private readonly contenidoRepository: Repository<Contenido>,
        @InjectRepository(Seccion) private readonly seccionRepository: Repository<Seccion>,
    ){}

    async getContenidos(){
      try{
        return this.contenidoRepository.find();
      } catch(err){
        console.log('err: ', err)
      }
    }

    async createContenido(payloadCreate: CreateContenidoDto){
      try{

        const seccion = await this.seccionRepository.findOneOrFail({
          where: { id: Number(payloadCreate.seccion_id) },
        });

        const urlFile = await this.s3Service.uploadBase64File(payloadCreate.image, 'contenidos');

        let newContenido = new Contenido()
        newContenido.image = urlFile;
        newContenido.seccion = seccion;
        newContenido.title = payloadCreate.title;
        newContenido.article = payloadCreate.article;
        newContenido.keywords = payloadCreate.keywords;
        newContenido.description = payloadCreate.description;
        newContenido.introduction = payloadCreate.introduction;
        newContenido.type = payloadCreate.type;

        const nuevoContenido = this.contenidoRepository.create(newContenido);
        
        return await this.contenidoRepository.save(nuevoContenido);

      } catch (err) {
        console.log('err: ', err)
        throw err;
      }
    }





  
  }