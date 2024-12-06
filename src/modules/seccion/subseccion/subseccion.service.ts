import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { S3Service } from "src/shared/services/s3.service";
import { Subseccion } from "./subseccion.entity";
import { Repository } from "typeorm";
import { CreateSubseccionDto } from "./dtos/create-subseccion.dto";
import { GetSubseccionsByIdSeccionDto } from "./dtos/get-subseccion-by-id-seccion.dto";
import { url } from "inspector";
import { Seccion } from "../seccion.entity";
import { updateOrderSubsectionsDto } from "./dtos/update-order-subsections.dto";


@Injectable()
export default class SubseccionService {

    // TODO: esta configuracion pasarla a variables de entorno
    s3Service: S3Service = new S3Service(
        { 
            region: process.env.REGION_S3, 
            credentials: {
                accessKeyId: process.env.ACCESS_KEY_S3,
                secretAccessKey: process.env.SECRET_KEY_S3
            }
        });
    constructor(
        @InjectRepository(Subseccion) private readonly subseccionRepository: Repository<Subseccion>,
        @InjectRepository(Seccion) private readonly seccionRepository: Repository<Seccion>,
    ){
        
    }

    async createSubSeccion(createSubseccionDto: CreateSubseccionDto): Promise<Subseccion>{
        try {
            console.log('createSubseccionDto: ', createSubseccionDto)

            // Busca la sección relacionada
            const seccion = await this.seccionRepository.findOneOrFail({
                where: { id: Number(createSubseccionDto.seccion_id) },
            });

            const urlFile = await this.s3Service.uploadBase64File(createSubseccionDto.image_header, 'uploads');
            
            let newSubseccion = new Subseccion()
            newSubseccion.name = createSubseccionDto.name;
            newSubseccion.description = createSubseccionDto.description;
            newSubseccion.image_header = urlFile;
            newSubseccion.seccion = seccion
            const nuevaSeccion = this.subseccionRepository.create(newSubseccion);
            
            return await this.subseccionRepository.save(nuevaSeccion);
        } catch(err) {
            console.log('err', err)
            throw err;
        }
    }

    async getSubseccionesByIdSeccion(params: GetSubseccionsByIdSeccionDto){
        try{
            const idSeccion = +params.idSeccion;
            return this.subseccionRepository.find({
                where: {
                    seccion: {
                        id: idSeccion
                    }
                }
            });
        } catch (err){
            console.log('error: ', err)
            throw err;
        }
    }

}