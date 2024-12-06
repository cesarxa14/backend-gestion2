import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

// Cargar el archivo .env
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Configurar bodyParser con un límite mayor para las solicitudes
  app.use(bodyParser.json({ limit: '10mb' })); // Ajusta el tamaño límite como desees
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // Para solicitudes form-data


  app.enableCors({
    origin: 'http://localhost:4200', // URL de tu aplicación Angular
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type,Authorization', // Headers permitidos
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
