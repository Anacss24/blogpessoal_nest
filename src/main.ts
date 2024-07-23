import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuramos o fuso-horário
  process.env.TZ = '-03:00';

  // Habilitamos o Validation Globalmente
  app.useGlobalPipes(new ValidationPipe());

  // Habilitamos requisições de outras origens (Servidores)
  app.enableCors();
  
  await app.listen(4000);
}
bootstrap();
