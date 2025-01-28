import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Cambia según tu URL de frontend
    methods: 'GET, POST, PUT, DELETE, PATCH', // Métodos permitidos
    credentials: true, // Si usas cookies
  });
  await app.listen(5000);
}
bootstrap();
