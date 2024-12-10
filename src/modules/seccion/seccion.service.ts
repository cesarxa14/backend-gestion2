import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Seccion } from "./seccion.entity";
import { CreateSeccionDto } from "./dtos/create-seccion.dto";
import { S3Service } from "src/shared/services/s3.service";
import { GetSectionByIdDto } from "./dtos/get-section-by-id.dto";
import { updateOrderSubsectionsDto } from "./subseccion/dtos/update-order-subsections.dto";
import { updateSectionDto } from "./subseccion/dtos/update-section.dto";


@Injectable()
export default class SeccionService {

    s3Service: S3Service = new S3Service(
        { 
            region: process.env.REGION_S3, 
            credentials: {
                accessKeyId: process.env.ACCESS_KEY_S3,
                secretAccessKey: process.env.SECRET_KEY_S3
            }
        });
    constructor(
        @InjectRepository(Seccion) private readonly seccionRepository: Repository<Seccion>,
    ){
        
    }
    async getSecciones(){
        try {
            return this.seccionRepository.find({
                where: {
                    deleted: 0
                }
            });
        } catch(err) {
            console.log('err', err)
            throw err;
        }
    }

    async getSeccionById(param: GetSectionByIdDto){
        try {
            const id = +param.id;
            return this.seccionRepository.findOne({
                where: {
                    id: id
                }
            });
        } catch(err) {
            console.log('err', err)
            throw err;
        }
    }

    async createSeccion(createSeccionDto: CreateSeccionDto): Promise<Seccion>{
        try {
            // console.log('createSeccionDto: ', createSeccionDto)
            const urlFile = await this.s3Service.uploadBase64File(createSeccionDto.image_header, 'uploads/sections');
            createSeccionDto.image_header = urlFile;
            const nuevaSeccion = this.seccionRepository.create(createSeccionDto);
            
            return await this.seccionRepository.save(nuevaSeccion);
        } catch(err) {
            console.log('err', err)
            throw err;
        }
    }

    async updateSection(id: number, updateSectionDto: updateSectionDto){
        try{
            const seccionFound = await this.seccionRepository.findOne({
                where: {
                    id: id
                }
            });

            if (!seccionFound) {
                throw new NotFoundException(`Seccion with id: ${id} not found`);
            }

            
            seccionFound.name = updateSectionDto.name;
            seccionFound.description = updateSectionDto.description

            console.log('seccionfound', seccionFound)
            // Guardar los cambios en la base de datos
            return this.seccionRepository.save(seccionFound);

        } catch(err) {
            console.log('err: ', err)
            throw err;
        }
    }

    
    async updateOrderSubsections(id: number, updateOrderSubsectionsDto: updateOrderSubsectionsDto){
        try{
            const seccionFound = await this.seccionRepository.findOne({
                where: {
                    id: id
                }
            });

            if (!seccionFound) {
                throw new NotFoundException(`Seccion with id ${id} not found`);
            }

            // Actualizar solo los campos proporcionados
            // Object.assign(seccionFound, updateOrderSubsectionsDto);
            console.log(updateOrderSubsectionsDto.subsections_order)
            seccionFound.subsections_order = updateOrderSubsectionsDto.subsections_order;

            console.log('seccionfound', seccionFound)
            // Guardar los cambios en la base de datos
            return this.seccionRepository.save(seccionFound);

        } catch(err) {
            console.log('err: ', err)
            throw err;
        }
    }

    async deleteSection(id: number){
        try{
            const seccionFound = await this.seccionRepository.findOne({
                where: {
                    id: id
                }
            });



            if (!seccionFound) {
                throw new NotFoundException(`Seccion with id ${id} not found`);
            }

            seccionFound.deleted = 1;
            return this.seccionRepository.save(seccionFound);

        } catch(err) {
            console.log('err: ', err)
            throw err;
        }
    }
}