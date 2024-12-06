import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Contenido } from "./contenido.entity";
import ContenidoController from "./contenido.controller";
import ContenidoService from "./contenido.service";
import { Seccion } from "../seccion/seccion.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Contenido, Seccion])],
    controllers: [ContenidoController],
    providers: [ContenidoService]
})

export default class ContenidoModule{}