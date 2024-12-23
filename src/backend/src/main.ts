import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './enums';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CLIENT_ENDPOINT,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
