import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './enums';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [process.env.CLIENT_ENDPOINT],
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'Authorization',
      'Apollo-Require-Preflight',
    ],
    exposedHeaders: ['Access-Control-Allow-Origin'],
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
