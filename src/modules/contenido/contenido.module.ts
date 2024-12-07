import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Contenido } from "./contenido.entity";
import ContenidoController from "./contenido.controller";
import ContenidoService from "./contenido.service";
import { Seccion } from "../seccion/seccion.entity";
import BloqueController from "./bloques/bloque.controller";
import BloqueService from "./bloques/bloque.service";
import { Bloque } from "./bloques/bloque.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Contenido, Seccion, Bloque])],
    controllers: [ContenidoController, BloqueController],
    providers: [ContenidoService, BloqueService]
})

export default class ContenidoModule{}