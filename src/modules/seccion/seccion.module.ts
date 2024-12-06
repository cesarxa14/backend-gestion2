import { Module } from "@nestjs/common";
import SeccionController from "./seccion.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Seccion } from "./seccion.entity";
import SeccionService from "./seccion.service";
import { Subseccion } from "./subseccion/subseccion.entity";
import SubSeccionController from "./subseccion/subseccion.controller";
import SubseccionService from "./subseccion/subseccion.service";


@Module({
    imports: [TypeOrmModule.forFeature([Seccion, Subseccion])],
    controllers: [SeccionController, SubSeccionController],
    providers: [SeccionService, SubseccionService]
})

export default class SeccionModule{}