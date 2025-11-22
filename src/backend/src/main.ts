import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import "./enums";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TODO: 모든 DTO에 validation decorator 추가 후 활성화
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //     transformOptions: {
  //       enableImplicitConversion: false,
  //     },
  //     whitelist: true,
  //   }),
  // );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
