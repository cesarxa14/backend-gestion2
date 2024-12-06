import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import SeccionModule from './modules/seccion/seccion.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Cambia según tu base de datos
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'chelseafc11',
      database: 'app-gestion',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // ¡No usar en producción!
    }),
    SeccionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
